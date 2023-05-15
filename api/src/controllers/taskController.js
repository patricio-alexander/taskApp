const pool = require("../database/db");

const getAllTasks = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM tasks");
  res.json(result);

};


const addTask = async (req, res) => {
  const { title, description } = req.body;
  const result = await pool.query(
    "INSERT INTO tasks (title, description) VALUES (?, ?)",
    [title, description]
  );
  res.json(result);
};

const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  const result = await pool.query("DELETE FROM tasks WHERE taskId = ?", [
    taskId,
  ]);
  res.json(result);
};

const updateTask = async (req, res) => {
  const result = await pool.query("UPDATE tasks SET ? WHERE taskId = ?", [
    req.body,
    req.params.taskId,
  ]);
  res.json(result);
};



const getTask = async (req, res) => {
  const taskId = req.params.taskId;
  const [result] = await pool.query("SELECT * FROM tasks WHERE taskId = ?", [taskId]);
  res.json(result);
}

module.exports = {
  getAllTasks,
  addTask,
  deleteTask,
  updateTask,
  getTask
};
