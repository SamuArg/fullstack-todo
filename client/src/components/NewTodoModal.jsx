import { useState, useRef } from "react";
import styled from "styled-components";
import addTodoRequest from "../api/addTodoRequest";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Component representing the window that appears when the user clicks on the button to add a new task
// Contains a form to fill out with task information
const NewTodoModal = ({ setTodos, setShowAlert }) => {
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
          input.current.click();
          resetAll();
          setShowAlert(true);
        })
        .catch((err) => {
          alert("Please log back in!");
          console.log(err);
          input.current.click();
          navigate("/login");
        });
    } else {
      setError("Please fill in all fields");
    }
  };
  return (
    <div className="modal fade" id="modal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">New task</h1>
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
                <label className="col-3">Title</label>
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
            <button type="button" onClick={addTodo} className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

NewTodoModal.propTypes = {
  setTodos: PropTypes.func.isRequired,
  setShowAlert: PropTypes.func.isRequired,
};

const Textarea = styled.textarea`
  resize: none;
`;

export default NewTodoModal;
