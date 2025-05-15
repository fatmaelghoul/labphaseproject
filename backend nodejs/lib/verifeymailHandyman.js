const nodemailer = require("nodemailer");
const verifeymailHandyman = require("./verifeymailHandyman");
require("dotenv").config();

module.exports = async (email, fullName, handymanId, origin) => {
  try {
    // Créez un transporteur pour envoyer l'email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: EMAIL,
        pass:EMAIL_PASSWORD,
      },
    });
  
    // Construisez le lien de vérification
    const verifyUrl = `${origin}/api/handyman/verifyEmail/${handymanId}`;
    const token = "your-generated-token"; // Générez un token JWT ou autre
    await verifeymailHandyman(email, fullName, handymanId, req.get("origin"), token);
    // Contenu de l'email
    async function main() {
        const info = await transporter.sendMail({
          from: process.env.EMAIL, // Sender address
          to: useremail, // Recipient email
          subject: 'Please verify your account', // Subject line
          text: `Hello ${fullName}, and welcome to HOME REPAIR SERVICES. Please click the link to verify your email: ${origin}/verifyemail/${id}/verify/${token}`, // Plain text body
          html: `<p>Hello ${fullName},</p>
                  <p>Click <a href="http://localhost:5173/verify-email/${id}"/verify/${token}">here</a> to verify your email.</p>
               <p>Thank you for registering!</p>`, // HTML body
        });
        console.log('Message sent: %s', info.messageId); // Message ID for tracking
      }
    // Envoyez l'email
    await transporter.sendMail(mailOptions);

    console.log(`Verification email sent to ${email}`);
    return { success: true, message: "Verification email sent successfully" };
  } catch (error) {
    console.error("Error sending verification email:", error.message);
    throw new Error("Failed to send verification email");
  }
};