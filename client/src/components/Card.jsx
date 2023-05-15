import { useEffect, useState } from "react";
import { updateTaskRequest } from "../api/taskApi";
import {
  BiEdit,
  BiTrash,
  BiError,
  BiCalendarCheck
} from "react-icons/bi";

export function Card({ tasks, deleteTask, editTask, loadChanges, filter }) {
  const [statusTask, setStatusTask] = useState({});
  const [taskId, setTaskId] = useState(0);

  const handleCheckboxChange = (event, taskId) => {
    setTaskId(taskId);
    setStatusTask({
      status: event.target.checked ? "completado" : "pendiente",
    });
  };

  const setColorStatus = (taskStatus) => {
    let color =
      taskStatus === "completado"
        ? "has-background-success-light has-text-success-dark"
        : "has-background-warning";
    return color;
  };

  const arrayFilter = tasks.filter((task) => {
    if (filter === "todos") return task;
    if (filter === task.status) return task;
  });

  useEffect(() => {
    const update = async () => {
      const updateTask = await updateTaskRequest(taskId, statusTask);
      loadChanges();
    };
    if (taskId !== 0) update();
  }, [taskId, statusTask]);

  if (arrayFilter.length > 0) {
    return arrayFilter.map((task) => (
      <div className="m-3" key={task.taskId}>
        <div className="card" style={{ maxWidth: "300px" }}>
          <header
            className={`card-header is-flex ${setColorStatus(task.status)}`}
          >
            <label className="checkbox m-3 is-flex is-align-content-center">
              <input
                type="checkbox"
                style={{ width: "17px", height: "17px" }}
                checked={task.status === "completado"}
                onChange={(event) => handleCheckboxChange(event, task.taskId)}
              />
            </label>

            <p className="card-header-title is-justify-content-center is-align-content-center">
              {task.title}
            </p>
            <span className="m-1 is-flex p-1 is-align-items-center">
              {task.status === "completado" ? (
                <BiCalendarCheck className="is-size-4" />
              ) : (
                <BiError className="is-size-4" />
              )}
            </span>
          </header>
          <div className="card-content">
            <div className="content">
              <p>{task.description}</p>
            </div>
          </div>
          <footer className="card-footer">
            <a
              href="#"
              className="card-footer-item  has-text-info"
              onClick={() => editTask(task.taskId)}
            >
              <span className="icon is-size-4">
                <BiEdit />
              </span>
            </a>
            <a
              href="#"
              className="card-footer-item has-text-danger"
              onClick={() => deleteTask(task.taskId)}
            >
              <span className="icon is-size-4">
                <BiTrash />
              </span>
            </a>
          </footer>
        </div>
      </div>
    ));
  } else {
    return (
      <div
        className="notification is-info is-light box mt-3"
        style={{ maxWidth: "400px" }}
      >
        {filter === "todos"
          ? "No tienes tareas agregadas a la lista"
          : filter === "completado"
          ? "No tienes tareas completadas"
          : "No tienes tareas pendientes"}
      </div>
    );
  }
}
