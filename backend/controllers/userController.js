const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// desc Authentication User
// @route post /api/user/login
// @access Private
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        
      _id: user.id,
      name: user.name,
      email: user.email,
          token: generateToken(user._id),
        isAdmin: user.isAdmin,
      isDisabled: user.isDisabled
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  res.status(200).json({ message: "result" });
});

// desc Authentication User
// @route post /api/user/register
// @access Private
const addNewUser = asyncHandler(async (req, res) => {
    const admin = await User.findById(req.user.id)
    if (admin && admin.isAdmin === true) { 

    const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Fill All The Fields");
  }
  //   to make sure if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.json({ message: "User Already Exists" });
  }
  // Hash Password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Not A Valid User");
  }
    }
    else {
        res.status(400).json({ message: "Only admin can create users" });

   }     
});

// desc all Users
// @route GET /api/user/users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const admin = await User.findById(req.user.id);
    if (admin && admin.isAdmin) { 
        const users = await User.find(req)
        res.status(200).json(users);
    }
    else {
        res.status(400).json({ message: "Only admin can access users" });
    }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

 
const disableUser = asyncHandler(async (req, res) => { 
 const {email, enable} = req.body  
  const admin = await User.findById(req.user.id);
  
  if (admin && admin.isAdmin) { 
    await User.findOneAndUpdate({ email: email }, { $set: { isDisabled: enable } }) 
    await User.findOne({ email: email }).then((data, err) => {
      if (err) {
        res.status(400).send(err.message)
      }
      res.status(200).send(data)
     })
  }
})
module.exports = { addNewUser, loginUser, getAllUsers, disableUser };  