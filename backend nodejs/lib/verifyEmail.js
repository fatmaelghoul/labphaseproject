const nodemailer = require("nodemailer");
// const { MAIL, EMAIL_PASSWORD } = process.env;
const dotenv = require("dotenv");
require("dotenv").config();
module.exports = (userEmail, fullName, id) => {
  const { EMAIL, EMAIL_PASSWORD } = process.env;
  // Create a transporter object using SMTP transport
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // true for 465, false for other ports
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    const info = await transporter.sendMail({
      from: process.env.EMAIL, // Sender address
      to: userEmail, // Recipient email
      subject: "Please verify your account", // Subject line
      subject: "Please verify your account", // Subject line
      html: `Hello ${fullName} and welcome to HOME REPAIR SERVICES. <br> Please click the link to verify your email: 
      <br> <a href="https://localhost:5000/verify-email/${id}" target="_blank" >link</a> to verify your account.
      Your account will be activated whitn ten days.
      `, // plain text body
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
};
