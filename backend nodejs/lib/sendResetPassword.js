const nodemailer = require('nodemailer');

const sendResetEmail = async (to, resetLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    const mailOptions = {
      from: `"Lapphase Support" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Réinitialisation de votre mot de passe',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
            <img src=""https://images03.nicepagecdn.com/c461c07a441a5d220e8feb1a/120d44b9caa45b1bba3ba103/min.png"" style="height: 50px;" alt="Logo Lapphase"/>
            <h2 style="color: #fff; margin-top: 10px;">Réinitialisation de mot de passe</h2>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <p style="font-size: 16px;">Vous avez demandé à réinitialiser votre mot de passe.</p>
            <p> Cliquez sur le bouton ci-dessous pour continuer :</p>
            <div style="text-align: center; margin: 25px;">
              <a href="${resetLink}" style="background-color: #ffc107; color: black; padding: 12px 24px; border-radius: 6px; text-decoration: none;">Réinitialiser le mot de passe</a>
            </div>
            <p style="font-size: 13px; color: #666;">Ce lien expirera dans 15 minutes. Si vous n'avez pas demandé cette action, ignorez ce message.</p>
          </div>
          <div style="background-color: #1a1a1a; color: #ccc; padding: 15px; text-align: center;">
            &copy; 2025 Lapphase — Tous droits réservés.
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email de réinitialisation envoyé à : ${to}`);
  } catch (error) {
    console.error("Erreur email reset :", error.message);
    throw new Error("Échec de l'envoi de l'email");
  }
};

module.exports = sendResetEmail;
