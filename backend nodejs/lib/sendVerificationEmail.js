const nodemailer = require("nodemailer");

const sendVerificationEmail = async (to, verificationLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    }); // ✅ fermeture du createTransport ici

    const mailOptions = {
      from: `"Home repear serices-HRS" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Confirmez votre adresse email Home repear serices-HRS",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #1a1a1a; color: #ffffff; text-align: center; padding: 20px;">
            <img src="https://images03.nicepagecdn.com/c461c07a441a5d220e8feb1a/120d44b9caa45b1bba3ba103/min.png" alt="HRS Logo" style="height: 60px;" />
            <h2 style="margin: 10px 0;">Bienvenue sur HRS </h2>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <p style="font-size: 16px;">Bonjour,</p>
            <p style="font-size: 16px;">Merci de vous être inscrit(e). Cliquez sur le bouton ci-dessous pour confirmer votre adresse email et activer votre compte :</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationLink}" target="_blank" style="background-color: #ffc107; color: #000000; padding: 14px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Vérifier mon adresse email
              </a>
            </div>
            <p style="font-size: 14px; color: #666;">Si vous n'avez pas créé de compte, vous pouvez ignorer ce message.</p>
          </div>
          <div style="background-color: #1a1a1a; color: #cccccc; text-align: center; padding: 15px; font-size: 13px;">
            &copy; 2025 Lapphase. Tous droits réservés.
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email de vérification envoyé à :", to);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error.message);
  }
};

module.exports = sendVerificationEmail;
