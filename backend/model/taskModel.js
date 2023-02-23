const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    task: {
      type: String,
      required: [true, "Please Add A Text"],
    },
    status: {
      type: String,
      required: true,

    },
    deadline: {
      type: Date,
      required: true,
    },
    isExpired: {
      type: Boolean,
      required: true,
      default: false,
    }
      
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
