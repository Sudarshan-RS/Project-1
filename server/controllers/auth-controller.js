const bcrypt = require("bcryptjs");
const User = require("../models/user-model");
const { json } = require("express");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to my first MERN project");
  } catch (error) {
    res.status(400).send({ message: "page not found" });
  }
};

//*-------------------------------------------------------------
//*  User Register Logic
//*-------------------------------------------------------------

const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(401).json({ message: "Email already exist!" });
    }

    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(201).json({
      message: "user created successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    // res.status(400).send({msg:"page not found"});
    next(error);
  }
};

//*-------------------------------------------------------------
//*  User login Logic
//*-------------------------------------------------------------


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    const user = await bcrypt.compare(password, userExist.password);

    if (user) {
      res.status(200).json({
        message: "Login successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    // res.status(500).json({ message: "internal server error" });
    next(error);
  }
};

//*-------------------------------------------------------------
//* to send user data - user Logic
//*-------------------------------------------------------------

const user = async (req,res)=>{
  try {
    const userData = req.user;
    return res.status(200).json({userData})
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
}
module.exports = { home, register, login, user };

// We use previous module which was created for the registration we can use this module for login
