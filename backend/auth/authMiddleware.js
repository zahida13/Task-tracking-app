const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get Token From Header
      token = req.headers.authorization.split(" ")[1];

      // Verify TOkne
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // GET USER FROM THE TOKEN
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (Err) {
      console.log(Err);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No User Found, NO Token");
  }
});

module.exports = { protect };