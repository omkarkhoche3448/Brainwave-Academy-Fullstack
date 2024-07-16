const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

exports.auth = async (req, res, next) => {
    console.log("req.body.token:", req.body.token);
    console.log("Header:", req.header("Authorization"));
    console.log("req.cookies.token:", req.cookies.token);

    try {
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token Not Found"
            });
        }

        const secretKey = process.env.JWT_SECRATE;

        if (!secretKey) {
            return res.status(500).json({
                success: false,
                message: "Secret key not set in environment"
            });
        }

        try {
            const decoded = jwt.verify(token, secretKey);
            console.log("Decoded Token:", decoded);
            req.user = decoded;
        } catch (error) {
            console.error("Token Verification Error:", error);
            return res.status(400).json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong while validating the token"
        });
    }
};

// isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(400).json({
                success: false,
                message: "This is Protected route for student only"
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User role can not be verified , please try again "
        });
    }
}

// isAdmin
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(400).json({
                success: false,
                message: "This is Protected route for Instructor only"
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User role can not be verified , please try again "
        });
    }
}


exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(400).json({
                success: false,
                message: "This is Protected route for Instructor only"
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User role can not be verified , please try again "
        });
    }
}
