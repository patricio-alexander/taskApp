import "bulma/css/bulma.min.css";
import { useState, useEffect } from "react";
import { getTasksRequest, deleteTaskRequest } from "./api/taskApi";
import { ModalForm } from "./components/ModalForm";
import { Card } from "./components/Card";

function App() {
  const [arrayTask, setInArrayTask] = useState([]);
  const [edit, setEdit] = useState(0);
  const modal = document.querySelector("#modal");
  const [filter, setFilter] = useState("todos");

  const filterByCompletedTasks = () => setFilter("completado");
  const filterByPendingTasks = () => setFilter("pendiente");
  const filterAllTasks = () => setFilter("todos");

  const showModal = () => {
    setEdit(0);
    modal.classList.add("is-active");
  };
  const hiddenModal = () => modal.classList.remove("is-active");

  const loadTask = async () => {
    const response = await getTasksRequest();
    setInArrayTask(response.data);
  };

  const deleteTask = (taskId) => {
    deleteTaskRequest(taskId);
    loadTask();
  };

  const editTask = (taskId) => {
    showModal();
    setEdit(taskId);
    loadTask();
  };

  useEffect(() => {
    loadTask();
  }, []);

  return (
    <>
      <div className="hero is-fullheight has-background-light">
        <div className="hero-body is-flex-direction-column is-justify-content-center">
          <ModalForm
            saveTask={loadTask}
            showModal={showModal}
            hiddenModal={hiddenModal}
            iWantEdit={edit}
            filterByCompleted={filterByCompletedTasks}
            filterByPending={filterByPendingTasks}
            filterAll={filterAllTasks}
          />
          <div className="is-flex is-flex-wrap-wrap">
            <Card
              tasks={arrayTask}
              deleteTask={deleteTask}
              editTask={editTask}
              loadChanges={loadTask}
              filter={filter}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
