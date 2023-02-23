const express = require("express");
const router = express.Router();
const {
  loginUser,
  getAllUsers,
  addNewUser,
  disableUser
} = require("../controllers/userController");
const { protect } = require("../auth/authMiddleWare");

router.post("/", protect, addNewUser);
router.post("/login", loginUser);
router.get("/users", protect,  getAllUsers);
router.post("/disable", protect, disableUser)
module.exports = router;