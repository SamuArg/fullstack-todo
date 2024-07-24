import { useState, useRef } from "react";
import styled from "styled-components";
import updateTodoRequest from "../api/updateTodoRequest";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
// Component representing the window that appears when the user decides to modify an existing task
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

  // Sends the request using the REST API
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
      // Modifies the current displayed task list with the server response, which sends back the new task list
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
      setError("Please fill in all the fields");
    }
  };
  return (
    <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Edit task</h1>
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
                  <option value="0">Normal</option>
                  <option value="1">Urgent</option>
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
              Cancel
            </button>
            <button
              type="button"
              onClick={editTodo}
              className="btn btn-primary"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

EditTodoModal.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    urgent: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  setTodos: PropTypes.func.isRequired,
  setShowEditAlert: PropTypes.func.isRequired,
};

const Textarea = styled.textarea`
  resize: none;
`;

export default EditTodoModal;
