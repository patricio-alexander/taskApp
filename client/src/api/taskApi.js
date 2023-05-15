import axios from "axios";

export const createTaskRequest = async (task) =>
  await axios.post("http://localhost:3000/api/tasks", task);

export const getTasksRequest = async () =>
  await axios.get("http://localhost:3000/api/tasks");

export const getTaskRequest = async (taskId) => 
  await axios.get(`http://localhost:3000/api/tasks/${taskId}`)

export const deleteTaskRequest = async (taskId) =>
  await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
  
export const updateTaskRequest = async (taskId, newValuesTask) => 
  await axios.put(`http://localhost:3000/api/tasks/${taskId}`, newValuesTask);



