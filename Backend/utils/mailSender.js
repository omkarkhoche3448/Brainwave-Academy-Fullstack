const nodemailer = require("nodemailer");
require("dotenv").config();

exports.mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: "Brainwave Academy",
      to: `${email}`,
      subject: ` ${title}`,
      html: `${body}`,
      text: "Hello dear",
    });
    console.log("info", info.response);
  } catch (error) {
    console.log("Error while sending mail by mail sender")
    console.error(error.message);
  }
};
