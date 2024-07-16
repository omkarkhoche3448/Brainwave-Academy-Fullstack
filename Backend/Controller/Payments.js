const { instance } = require('../config/razorpay');
const Course = require("../models/course");
const User = require("../models/user");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templete/courseEnrollmentEmail");
const { default: mongoose, Mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../mail/templete/paymentSuccessEmail");
const crypto = require("crypto");
const CourseProgress = require("../models/courseProgress")

exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if (courses.length === 0) {
        return res.json({
            success: false,
            message: "Provide courseId"
        })
    }

    let totalAmount = 0;

    for (const courseId of courses) {
        let course;
        try {

            course = await Course.findById(courseId);
            if (!course) {
                return res.status(200).json({
                    success: false,
                    message: "Course doesn't exist"
                })
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({
                    success: false,
                    message: "User already registered"
                })
            }

            totalAmount += parseInt(course.price);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    console.log("The amount in capturePayment is", totalAmount)
    const currency = "INR"
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString()
    }

    try {
        const paymentResponse = await instance.orders.create(options)
        res.json({
            success: true,
            message: paymentResponse
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, mesage: "Could not Initiate Order" });
    }
}

const enrollStudents = async (courses, userId) => {
    if (!courses || !userId) {
        throw new Error("Please provide data for Courses or UserId");
    }

    const results = [];
    for (const courseId of courses) {
        try {
            const updatedCourse = await Course.findByIdAndUpdate(courseId, {
                $push: { studentsEnrolled: userId }
            }, { new: true });

            if (!updatedCourse) {
                throw new Error("Course not Found");
            }

            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
            });

            const updatedStudent = await User.findByIdAndUpdate(userId, {
                $push: {
                    Courses: courseId,
                    courseProgress: courseProgress._id,
                }
            }, { new: true });

            // Optionally, send an email here or collect email tasks to execute later

            results.push({ success: true, courseId });
        } catch (error) {
            results.push({ success: false, message: error.message, courseId });
        }
    }

    return results;
}

exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(200).json({ success: false, message: "Payment Failed" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        try {
            const enrollResults = await enrollStudents(courses, userId);

            const allSuccessful = enrollResults.every(result => result.success);
            if (allSuccessful) {
                return res.status(200).json({ success: true, message: "Payment Verified and Enrollment Successful" });
            } else {
                return res.status(500).json({ success: false, message: "Some enrollments failed", details: enrollResults });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    } else {
        return res.status(200).json({ success: false, message: "Payment Failed" });
    }
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;

    console.log("email sending", orderId, paymentId, amount)

    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({ success: false, message: "Please provide all the fields" });
    }
    console.log("sendPaymentSuccessEmail")

    // try {
    //     const user = await User.findById(userId);
    //     console.log("user")
    //     await mailSender(
    //         user.email,
    //         `Payment Received`,
    //         paymentSuccessEmail(`${user.firstName}`,
    //             amount / 100, orderId, paymentId)
    //     )
    // } catch (error) {
    //     console.log("error in sending mail", error)
    //     return res.status(500).json({ success: false, message: "Could not send email" })
    // }
}














