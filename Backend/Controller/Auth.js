const User = require('../models/user');
const Profile = require('../models/profile')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { mailSender } = require('../utils/mailSender');
const OTP = require("../models/otp");
const otpGenerator = require('otp-generator');
require('dotenv').config();


// Send OTP
exports.sendOtp = async (req, res) => {
    try {
        console.log("first");
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "User is already registered",
            });
        }

        let otp;
        let otpRecord;

        do {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            otpRecord = await OTP.findOne({ otp });
        } while (otpRecord);

        const otpPayload = { email, otp };
        await OTP.create(otpPayload);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp,
        });
    } catch (error) {
        console.error("Error while sending OTP:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Signup
exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, contactNumber = " ", accountType, otp } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Validate OTP
        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        }

        // Validate password match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);
        let approved;

        approved = accountType === "Instructor" ? false : true;

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })
        // Create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            contactNumber,
            accountType,
            additionalDetails: profileDetails._id,
            approved: approved,
            userImage: `https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=${firstName}${lastName}`,
            otp,
        });

        res.status(201).json({
            success: true,
            user,
            message: "User created successfully",
        });
    } catch (error) {
        console.error("Error in signUp:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Login -> Authenticating User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found. Signup first or check email and password"
            });
        }

        if (await bcrypt.compare(password, user.password)) {

            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            };
            const token = jwt.sign(payload, process.env.JWT_SECRATE, { expiresIn: "2h" });
            user.token = token;
            user.password = undefined;

            const options = {
                httpOnly: true,
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully"
            });

        } else {
            res.status(401).json({
                success: false,
                message: "Password is incorrect"
            });
        }
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { email, password, confirmPassword, oldPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!(await bcrypt.compare(oldPassword, user.password))) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate(
            { email: email },
            { password: hashPassword },
            { new: true }
        );

        await mailSender(email, "Password change successfully", "Have a good day");
        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        console.error("Error while changing password:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
