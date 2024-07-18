import styled from "styled-components";
const BigTodo = ({ todo, modalId }) => {
  const date = todo.date.split("T")[0];
  return (
    <div className="modal" id={todo._id} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <Container urgent={todo.urgent} className="modal-content">
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
            <p>Importance : {todo.urgent === "1" ? "Urgente" : "Normale"}</p>
            <p>Complétée : {todo.completed ? "Oui" : "Non"}</p>
          </div>
          <div className="modal-footer">
            <button
              data-bs-toggle="modal"
              data-bs-target={modalId}
              className="btn btn-primary"
            >
              Modifier
            </button>
          </div>
        </Container>
      </div>
    </div>
  );
};

const Container = styled.div`
  background-color: ${({ urgent, completed }) =>
    completed === "true" ? "#aaaaaa" : urgent === "1" ? "#de7777" : "#e8e7f2"};
  .modal-body {
    word-break: break-all;
  }
`;

export default BigTodo;
