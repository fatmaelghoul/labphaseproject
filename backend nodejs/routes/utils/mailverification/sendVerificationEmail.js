// utils/sendVerificationEmail.js
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const sendVerificationEmail = async (user, role) => {
  const token = jwt.sign(
    { id: user._id, role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' } // expiration en 1 jour
  );

  const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  // Création du transporteur nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER, // votre adresse Gmail
      pass: process.env.MAIL_PASS  // mot de passe ou app password
    }
  });

  const mailOptions = {
    from: `"Support" <${process.env.MAIL_USER}>`,
    to: user.email,
    subject: 'Vérification de votre adresse email',
    html: `
      <h2>Bonjour ${user.fullName},</h2>
      <p>Merci de vous être inscrit en tant que <strong>${role}</strong>.</p>
      <p>Veuillez cliquer sur le lien ci-dessous pour vérifier votre adresse email :</p>
      <a href="${verifyLink}">${verifyLink}</a>
      <p>Ce lien expire dans 24 heures.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
