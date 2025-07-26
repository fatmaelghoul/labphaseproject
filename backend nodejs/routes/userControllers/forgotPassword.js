const User = require('../../models/User');
const sendVerificationEmail = require('../../lib/sendVerificationEmail');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

module.exports = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable.' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 heure
    await user.save();

    const resetLink = `http://localhost:5173/reset-password?token=${token}`;
    await sendVerificationEmail(
      email,
      resetLink,
      'Réinitialisation du mot de passe',
      `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`
    );

    res.status(200).json({ message: 'Email de réinitialisation envoyé.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};