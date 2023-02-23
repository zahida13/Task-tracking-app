const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Task = require("../model/taskModel");
const User = require("../model/userModel");

// @desc Get Goals
// @API GET /api/goals
// @access Private
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.find({ userId: req.user.id });

  res.status(200).json(task);
});

const getAllTasks = asyncHandler(async (req, res) => { 
  const admin = await User.findById({ _id: req.user.id })
  if (admin && admin.isAdmin == true) { 

    await Task.find(req).populate("userId").then((data, err) => {
      if (err) return res.status(400).json({ message: err.message });
      res.status(200).json(data);
    })
  }
  else {
    res.status(404).json({ message: "not an authorized user" });
  }
  

})

// @desc Post Goals
// @API GET /api/tasks
// @access Private
const setTasks = asyncHandler(async (req, res) => {
  const admin = await User.findById(req.user.id) 
  if (admin && admin.isAdmin) {
    
    const { userId, task, status, deadline } = req.body
    const newTask = await Task.create({
      task,
      userId,  
      status,
      deadline
    });  
    
    res.status(200).json(newTask);
  } 
});
 
// @desc Put Goals
// @API GET /api/goals/:id
// @access Private
const updateTask = asyncHandler(async (req, res) => {
  const {status} = req.body

  const task = await Task.findById(req.params.id).populate("userId");
  if (!task) {
    res.status(400);
    throw new Error("Task Not Found");
  }

   
  // Make Sure The Logged In User Matches The Task User
  if (task.userId._id.toString() !== req.user.id) {
    res.status(401).send({ message: "User Not Authorized" });
  }
  if (task.userId.isDisabled) {
    res.status(403).send({ message: "Since you are disabled, You can not make any changes" })
  }
   await Task.findOneAndUpdate({ _id: task.id }, { $set: { status: status }, new: true })
  await Task.findById({ _id: req.params.id }).then((data, err) => { 
    if (err) res.status(500).json({ message: err.message });
    res.status(200).json(data);
  })
});

const isExpiredTask = asyncHandler(async (req, res) => { 
  const admin = await User.findById("63f4faf607630114d1539eb2") 
  const task = await Task.find({ userId: "63f4faf607630114d1539eb2" })
  
  task.map((tas) => {
// taking and modifying system date
    const date = new Date().toUTCString().toString().split(" ")
    const dateModify =  date[0].split("").slice(0, 3).join("")  
    const finalDate = [dateModify, date[2], date[1], date[3]].join(" ")
    
    // taking and modifying deadline
    const expireDate = tas.deadline.toString().split(" ").splice(0, 4)
    const day = expireDate[0].split("").splice(0, 3).join("")  
    const returnDate = [day, expireDate[1], expireDate[2], expireDate[3]].join(" ")
    
    // emplementing expire function
      
    if (returnDate == finalDate) {
      async function expireChecker (){

        
        await Task.findOneAndUpdate({ _id: tas._id }, { $set: { isExpired: true }, new: true })  
      }
      expireChecker()
        
    }   
  })

  const updated = await Task.find({ userId: "63f4faf607630114d1539eb2" })
})
 


module.exports = {
  getTask,
  setTasks,
    updateTask,
  getAllTasks,
    isExpiredTask
};