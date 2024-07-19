import { useState, useRef } from "react";
import styled from "styled-components";
import updateTodoRequest from "../api/updateTodoRequest";
import { useNavigate } from "react-router-dom";
// Component représentant la fenêtre qui s'ouvre lorsqu'on décide de modifier une tâche existante
const EditTodoModal = ({ todo, setTodos, setShowEditAlert }) => {
  const navigate = useNavigate();
  const currentDate = new Date().toISOString().slice(0, 10);
  const [title, setTitle] = useState(todo.title);
  const [date, setDate] = useState(todo.date.split("T")[0]);
  const [description, setDescription] = useState(todo.description);
  const [urgent, setUrgent] = useState(todo.urgent);
  const [error, setError] = useState("");
  const modalId = `modal${todo._id}`;
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
  const input = useRef(null);

  //Envoie la requête via l'API rest
  const editTodo = () => {
    if (title && date && description && urgent) {
      const updates = {
        title: title,
        date: date,
        description: description,
        urgent: urgent,
        completed: todo.completed,
      };
      const token = localStorage.getItem("token");
      //Modifie la liste actuelle affichée des tâches avec la réponse du serveur qui nous renvoie la nouvelle liste de tâches
      updateTodoRequest(updates, todo, token)
        .then((response) => {
          setTodos(response.todos);
          input.current.click();
          setShowEditAlert(true);
        })
        .catch((err) => {
          console.log(err);
          input.current.click();
          navigate("/login");
        });
    } else {
      setError("Veuillez remplir tous les champs");
    }
  };
  return (
    <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Modifier tâche</h1>
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
                <label className="col-3">Titre</label>
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
                <label className="col-3">Date</label>
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
                <label className="col-3">Description</label>
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
            <button
              type="button"
              onClick={editTodo}
              className="btn btn-primary"
            >
              Modifier
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

export default EditTodoModal;
