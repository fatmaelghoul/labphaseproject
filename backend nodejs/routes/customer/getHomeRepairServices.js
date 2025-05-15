const HomeRepairService = require("../../models/HomeRepairService");

module.exports = async (req, res) => {
  try {
    const data = await Act.find()
      .populate("Id", "-serviceName")
      .populate("category", "-description", "- isAvailable")
      .populate("Handyman", " price");
    res.status(200).json({ status: true, data });
  } catch (error) {
    console.log(error);
    res.status(406).json({ status: true, error });
  }
};
