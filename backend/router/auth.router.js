const express = require("express");
const AuthModel = require("../schema/auth.model");
const router = express.Router();
const bcrypt = require("bcryptjs");
const AuthVerify = require("../middleware/authverify.middleware");
const jwt = require("jsonwebtoken");
const { signupFunc, loginFunc } = require("../controllers/auth.controlers");

const SECRET_KEY = process.env.SECRET_KEY;

router.post("/signup", signupFunc);

router.post("/login", loginFunc);

router.get("/profile", AuthVerify, async (req, res) => {
  const userId = req.user;

  try {
    const user = await AuthModel.findById(userId);
    res.status(200).send({
      success: true,
      message: "Account fetched successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error!",
    });
  }
});

router.put("/profile", AuthVerify, async (req, res) => {
  const { phone, age, gender, address, city, state, country, pincode } =
    req.body;

  try {
    const user = await AuthModel.findById(req.user);

    if (phone) user.phone = phone;
    if (age) user.age = age;
    if (gender) user.gender = gender;
    if (address) user.address = address;
    if (pincode) user.pincode = pincode;
    if (city) user.city = city;
    if (state) user.state = state;
    if (country) user.country = country;

    const updatedUser = await user.save();

    res.status(201).send({
      success: true,
      message: "Account updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    let message = Object.values(error?.errors)[0]?.properties?.message;
    if (!message) message = "Internal server error!";

    return res.status(500).send({
      success: false,
      message,
    });
  }
});

router.delete("/profile", AuthVerify, async (req, res) => {
  try {
    const user = await AuthModel.findByIdAndDelete(req.user);
    res.status(200).send({
      success: true,
      message: "Account deleted successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error!",
    });
  }
});

module.exports = router;
