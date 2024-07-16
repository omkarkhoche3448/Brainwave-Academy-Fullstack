const mongoose = require('mongoose');
const { mailSender } = require('../utils/mailSender');
const emailVerificationTemplate = require("../mail/templete/emailVerificationTemplet");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now(),
        expires: 10 * 60
    },
    otp: {
        type: Number,
        required: true
    }
});

async function sendVerificationEmail(email, otp) {
    try {
        console.log(email, otp)
        const mailResponce = await mailSender(email, "verification Email form Brainwave Academy", emailVerificationTemplate(otp));

        console.log("Email send succesfulll");

    } catch (error) {
        console.log("Error Occured while sending verificationn mail", error);
        throw error;
    }
}

OTPSchema.pre('save', async function (next) {
    try {
        await sendVerificationEmail(this.email, this.otp);
    } catch (error) {
        console.log("Error Occured while sending verificationn mail", error);
        throw error;
    }
    next();
})

module.exports = mongoose.model('OTP', OTPSchema)