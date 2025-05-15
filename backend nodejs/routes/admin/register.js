const Admin = require("../../models/Admin");
const bcrypt = require("bcryptjs");
const verifyEmail = require("../../lib/verifyEmail");
module.exports = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, address } = req.body;
    console.log(req.body);
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res
        .status(401)
        .json({ status: false, error: "This email is already in use" });
    }
    const adminCheckPhone = await Admin.findOne({ phoneNumber });
    if (adminCheckPhone) {
      return res
        .status(401)
        .json({ status: false, error: "This phone is already in use" });
    }
    const pwdRegEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!pwdRegEx.test(password.trim())) {
      return res.status(406).json({
        status: false, // <-- ici on passe à false, car c'est une erreur
        error:
          "Invalid Password: minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newAdmin = new Admin({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    const createdAdmin = await newAdmin.save();

    verifyEmail(email, fullName, createdAdmin._id, req.get("origin"));
    res
      .status(200)
      .json({ status: true, message: "Admin was created successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error: error.error });
  }
};
