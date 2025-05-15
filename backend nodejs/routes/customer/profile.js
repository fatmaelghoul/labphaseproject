module.exports = {
  getProfile: async (req, res) => {
    try {
      const { id } = req.params;
      // Remplacez `Customer` par votre modèle Mongoose
      const customer = await Customer.findById(id);
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.status(200).json(customer);
    } catch (error) {
      console.error("Error fetching profile:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      // Remplacez `Customer` par votre modèle Mongoose
      const updatedCustomer = await Customer.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedCustomer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.status(200).json(updatedCustomer);
    } catch (error) {
      console.error("Error updating profile:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};