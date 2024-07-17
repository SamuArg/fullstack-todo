import { useState, useRef } from "react";
import styled from "styled-components";
import addTodoRequest from "../api/addTodoRequest";
import { useNavigate } from "react-router-dom";

const NewTodoModal = ({ setTodos }) => {
  const navigate = useNavigate();
  const currentDate = new Date().toISOString().slice(0, 10);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [urgent, setUrgent] = useState("");
  const [error, setError] = useState("");
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleUrgent = (e) => {
    setUrgent(e.target.value);
  };
  const resetAll = () => {
    setTitle("");
    setDate("");
    setDescription("");
    setUrgent("");
    setError("");
  };
  const input = useRef(null);
  const addTodo = () => {
    if (title && date && description && urgent) {
      const todo = {
        title: title,
        date: date,
        description: description,
        urgent: urgent,
        completed: false,
      };
      const token = localStorage.getItem("token");
      addTodoRequest(todo, token)
        .then((response) => {
          setTodos(response.todos);
          alert("Votre tâche a bien été créée");
          resetAll();
          input.current.click();
        })
        .catch((err) => {
          alert("Veuillez vous reconnectez !");
          console.log(err);
          input.current.click();
          navigate("/login");
        });
    } else {
      setError("Veuillez remplir tous les champs");
    }
  };
  return (
    <div
      className="modal fade"
      id="modal"
      tabIndex="-1"
      aria-labelledby="ModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Nouvelle tâche</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group row mb-2">
                <label className="col-3" htmlFor="title">
                  Titre
                </label>
                <div className="col-4">
                  <input
                    onChange={handleTitle}
                    type="text"
                    className="form-control"
                    maxLength="10"
                    required
                    value={title}
                  />
                </div>
              </div>
              <div className="form-group row mb-2">
                <label className="col-3" htmlFor="date">
                  Date
                </label>
                <div className="col-4">
                  <input
                    onChange={handleDate}
                    type="date"
                    min={currentDate}
                    required
                    value={date}
                  />
                </div>
              </div>
              <div className="form-group row mb-2">
                <label className="col-3" htmlFor="description">
                  Description
                </label>
                <div className="col">
                  <Textarea
                    onChange={handleDescription}
                    maxLength="100"
                    className="form-control"
                    required
                    value={description}
                  />
                </div>
              </div>
              <div className="col-4">
                <select
                  onChange={handleUrgent}
                  className="form-select"
                  required
                  value={urgent}
                >
                  <option value="" defaultValue={""}>
                    Importance
                  </option>
                  <option value="0">Normale</option>
                  <option value="1">Urgente</option>
                </select>
              </div>
              <p className="text-center text-danger">{error}</p>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={input}
            >
              Annuler
            </button>
            <button type="button" onClick={addTodo} className="btn btn-primary">
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Textarea = styled.textarea`
  resize: none;
`;

export default NewTodoModal;
