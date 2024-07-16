const express = require('express');
const Contact = require('../models/contactus');
const { mailSender } = require('../utils/mailSender');
const { contactUsEmail } = require('../mail/templete/conatctFormRes');
require('dotenv').config();

exports.contactUsController = async (req, res) => {
    console.log("Conatcting")
    try {
        const { firstName, lastName, email, message, phoneNo, countrycode } = req.body;

        // Proceed with contact form submission
        if (!firstName || !lastName || !email || !message || !phoneNo || !countrycode) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Save contact message to the database
        const contactMessage = new Contact({
            firstName,
            lastName,
            email,
            message,
            phoneNo,
            countrycode
        });
        await contactMessage.save();

        const customerEmail = req.body.email;

        // Send email to the user who submitted the contact form
        await mailSender(
            customerEmail,
            "Your Data sent successfully",
            contactUsEmail(customerEmail, firstName, lastName, message, phoneNo)
        );

        res.status(201).json({ message: "Message sent successfully." });
    } catch (error) {
        console.error("Error handling contact form submission:", error);
        res.status(500).json({ error: "Error handling contact form submission. Please try again later." });
    }
};


// Retrieve all contact messages
// exports.getAllContactInfo = async (req, res) => {
//     try {
//         const contactMessages = await Contact.find().sort({ createdAt: -1 });
//         res.status(200).json(contactMessages);
//     } catch (error) {
//         console.error("Error retrieving contact messages:", error);
//         res.status(500).json({ error: "Error retrieving contact messages. Please try again later." });
//     }
// }