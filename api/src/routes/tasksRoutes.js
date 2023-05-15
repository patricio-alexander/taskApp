const express = require("express");
const taskController = require("../controllers/taskController");
const router = express.Router();

router.get("/tasks", taskController.getAllTasks)
      .get("/tasks/:taskId", taskController.getTask) 
      .post("/tasks", taskController.addTask)
      .put("/tasks/:taskId", taskController.updateTask)
      .delete("/tasks/:taskId", taskController.deleteTask);


module.exports = router;