const express = require("express");
const router = express.Router();
const {
  getTask,
  setTasks,
  updateTask,
    getAllTasks,
    isExpiredTask
} = require("../controllers/taskController");
const { protect } = require("../auth/authMiddleWare");

router.get("/", protect, getTask).post("/", protect, setTasks);
router.get("/all",protect, getAllTasks)
router.put("/:id", protect, updateTask);
router.put("/expiredChecker", protect, isExpiredTask);

module.exports = router;
