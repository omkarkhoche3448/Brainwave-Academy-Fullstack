const User = require("../models/user")
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { mailSender } = require("../utils/mailSender");
const passwordUpdated = require("../mail/templete/paswordUpdate").passwordUpdated;
const passwordResetEmailTemplet = require('../mail/templete/passwordResetEmailTemplet').passwordResetEmailTemplet;
require('dotenv').config();

exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email not registerd"
            })
        };

        const token = crypto.randomUUID();
        const url = `http://localhost:5173/update-password/${token}`

        const updateDetails = await User.findOneAndUpdate({ email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000
            },
            { new: true }
        );

        const emailContent = await mailSender(email, "ResetPassword Email for Brainwave Academy", passwordResetEmailTemplet(url, email));

        res.status(200).json({
            success: true,
            message: "resetpassword Link send to email"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "issue while resetting paassword token"
        })
    }
}

//Reset password
exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                succses: false,
                message: "Password Not match"
            })
        }

        const userDetails = await User.findOne({ token: token });
        console.log(userDetails)

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Token invalid"
            });
        }

        if (User.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Token Expired"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            { token: token },
            { password: hashPassword },
            { new: true }
        )

        const email = userDetails.email;
        // console.log(email)

        const emailContent = await mailSender(email, "Password Update Confirmation form Brainwave Academy", passwordUpdated(email));
        // console.log(emailContent)

        res.status(200).json({
            success: true,
            message: "password Reset succesfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "issue while resetting password"
        })
    }
}