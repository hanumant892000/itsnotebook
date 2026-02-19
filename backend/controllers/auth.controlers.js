const AuthModel = require("../schema/auth.model");
const bcrypt = require("bcryptjs");
const AuthVerify = require("../middleware/authverify.middleware");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const signupFunc = async (req, res) => {
  const { name, email, password } = req.body;

  if (!password) {
    return res.status(404).send({
      success: false,
      message: "Password is required!",
    });
  }

  if (password.length < 8) {
    return res.status(400).send({
      success: false,
      message: "Password must atleast 8 characters!",
    });
  }

  let user = await AuthModel.findOne({ email });

  if (user) {
    return res.status(400).send({
      success: false,
      message: "Your account already exist!",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user = await AuthModel.create({ name, email, password: hashPassword });
    res.status(201).send({
      success: true,
      message: "Account created successfully!",
      user,
    });
  } catch (error) {
    let message = Object.values(error?.errors)[0]?.properties?.message;
    if (!message) message = "Internal server error!";

    return res.status(500).send({
      success: false,
      message,
    });
  }
};

const loginFunc = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).send({
      success: false,
      message: "All fields are required!",
    });
  }

  try {
    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password!",
      });
    }

    const isCorrectPass = await bcrypt.compare(password, user.password);

    if (!isCorrectPass) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password!",
      });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY);

    res.status(200).send({
      success: true,
      message: "Account loggedin successfully!",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error!",
    });
  }
};

module.exports = { signupFunc, loginFunc };
