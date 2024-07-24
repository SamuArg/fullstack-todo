import styled from "styled-components";
import PropTypes from "prop-types";
// Component representing a task displayed in the center of the screen to view all its information in a larger format
const BigTodo = ({ todo, modalId }) => {
  const date = todo.date.split("T")[0];
  return (
    <div className="modal" id={todo._id} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <Container
          // Dynamic style variable used only in styled-components
          $urgent={todo.urgent}
          $completed={todo.completed}
          className="modal-content"
        >
          <div className="modal-header">
            <h5 className="modal-title">{todo.title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <h6>Date : {date}</h6>
            <p>Description : {todo.description}</p>
            <p>Importance : {todo.urgent === "1" ? "Urgent" : "Normal"}</p>
            <p>Completed : {todo.completed ? "Yes" : "Non"}</p>
          </div>
          <div className="modal-footer">
            <button
              data-bs-toggle="modal"
              data-bs-target={modalId}
              className="btn btn-primary"
            >
              Edit
            </button>
          </div>
        </Container>
      </div>
    </div>
  );
};

BigTodo.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    urgent: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  modalId: PropTypes.string.isRequired,
};

const Container = styled.div`
  background-color: ${({ $urgent, $completed }) =>
    $completed ? "#aaaaaa" : $urgent === "1" ? "#de7777" : "#e8e7f2"};
  .modal-body {
    word-break: break-all;
  }
`;

export default BigTodo;
