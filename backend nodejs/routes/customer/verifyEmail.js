const Customer = require('../../models/Customer');

const verifyEmail = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id)

    if (!customer) {
      return res.status(400).json({ message: 'Token invalide ou expiré.' });
    }

    customer.isVerified = true;
    await customer.save();
    res.status(200).json({ message: '✅ Email vérifié avec succès. Vous pouvez maintenant vous connecter.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur lors de la vérification.', error: err.message });
  }
};

module.exports = verifyEmail;
