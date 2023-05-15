import { useState, useEffect } from "react";
import {
  createTaskRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/taskApi";
import { BiCalendarCheck, BiDialpad, BiError } from "react-icons/bi";

export function ModalForm({
  saveTask,
  showModal,
  hiddenModal,
  iWantEdit,
  filterByCompleted,
  filterByPending,
  filterAll,
}) {
  const initialTaskStatus = { title: "", description: "" };
  const [form, setForm] = useState(initialTaskStatus);

  useEffect(() => {
    const loadTaskinModal = async () => {
      if (iWantEdit) {
        const res = await getTaskRequest(iWantEdit);
        const {
          data: [{ title, description }],
        } = res;

        setForm({ title, description });
      }
    };

    loadTaskinModal();
  }, [iWantEdit]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (iWantEdit) {
      const res = await updateTaskRequest(iWantEdit, form);
      setForm(initialTaskStatus);
    } else {
      try {
        const response = await createTaskRequest(form);
        setForm(initialTaskStatus);
      } catch (error) {
        console.log(error);
      }
    }

    saveTask();
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <div className="is-flex is-justify-content-center is-flex-direction-column">
        <button
          className="button is-link is-light mb-4 box"
          onClick={() => {
            showModal();
            setForm(initialTaskStatus);
          }}
        >
          Añadir Tarea 📝
        </button>
        <div className="field has-addons is-justify-content-center">
          <p className="control">
            <button
              className="button is-link is-light box is-flex"
              onClick={filterAll}
            >
              <span className="icon">
                <BiDialpad className="is-size-5" />
              </span>
              <span>Todos</span>
            </button>
          </p>
          <p className="control">
            <button
              className="button is-success is-light box is-flex"
              onClick={filterByCompleted}
            >
              <span className="icon">
                <BiCalendarCheck className="is-size-5" />
              </span>
              <span>Completados</span>
            </button>
          </p>
          <p className="control">
            <button
              className="button is-warning is-light box is-flex"
              onClick={filterByPending}
            >
              <span className="icon">
                <BiError className="is-size-5" />
              </span>
              <span>Pendientes</span>
            </button>
          </p>
        </div>
      </div>
      <div className="modal" id="modal">
        <form onSubmit={handleSubmit}>
          <div className="modal-background"></div>
          <div className="modal-card" style={{ maxWidth: "400px" }}>
            <header className="modal-card-head">
              <p className="modal-card-title">
                {iWantEdit ? "Actualizar Tarea" : "Añadir Tarea"}
              </p>
              <button
                type="button"
                className="delete"
                aria-label="close"
                onClick={hiddenModal}
              ></button>
            </header>

            <section className="modal-card-body">
              <div className="field">
                <label className="label">Titulo</label>
                <div className="control">
                  <input
                    className={`input ${
                      form.title.length > 5 ? "is-primary" : "is-danger"
                    }`}
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Titulo de la tarea"
                  />
                  {form.title.length > 5 ? (
                    <p className="help is-success">Campo Completado</p>
                  ) : (
                    <p className="help is-danger">Completa el campo</p>
                  )}
                </div>
              </div>

              <div className="field">
                <label className="label">Descripcion</label>
                <div className="control">
                  <textarea
                    className={`textarea ${
                      form.description.length > 7 ? "is-primary" : "is-danger"
                    }`}
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    type="text"
                    placeholder="Descripción"
                  />
                  {form.description.length > 6 ? (
                    <p className="help is-success">Campo Completado</p>
                  ) : (
                    <p className="help is-danger">Completa el campo</p>
                  )}
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button
                type="submit"
                className="button is-success"
                onClick={hiddenModal}
                disabled={
                  form.description.length > 5 && form.title.length > 5
                    ? false
                    : true
                }
              >
                {iWantEdit ? "Actualizar" : "Guardar"}
              </button>
            </footer>
          </div>
        </form>
      </div>
    </>
  );
}
