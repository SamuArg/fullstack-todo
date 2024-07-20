import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import updateTodoRequest from "../api/updateTodoRequest";
import deleteTodoRequest from "../api/deleteTodoRequest";
import EditTodoModal from "./EditTodoModal";
import BigTodo from "./BigTodo";
import DeleteModal from "./DeleteModal";
import { useState, useRef } from "react";

//Component représentant chaque tâche dans la page principal, permet de gérer chaque tâche individuellement en cliquant sur leurs boutons respectifs
const Todo = ({ todo, setTodos, setShowEditAlert }) => {
  const [deleteMessage, setDeleteMessage] = useState("");
  const deleteButtonRef = useRef(null);
  const askDeleteTodo = () => {
    setDeleteMessage("Êtes-vous certain de vouloir supprimer la tâche ?");
    deleteButtonRef.current.click();
  };

  const deleteTodo = () => {
    const token = localStorage.getItem("token");
    deleteTodoRequest(todo, token)
      .then((response) => {
        setTodos(response.todos);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateCompleted = () => {
    const token = localStorage.getItem("token");
    updateTodoRequest(
      {
        completed: !todo.completed,
      },
      todo,
      token
    )
      .then((response) => {
        setTodos(response.todos);
        if (!todo.completed) {
          setDeleteMessage("Voulez-vous supprimer cette tâche complétée ?");
          deleteButtonRef.current.click();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const date = todo.date.split("T")[0];
  const modalId = `#modal${todo._id}`;
  const todoId = `#${todo._id}`;
  return (
    <div className="mb-4">
      <Container
        className="card col-sm"
        $urgent={todo.urgent}
        $completed={todo.completed}
      >
        <div className="card-body">
          <Title>
            <h3
              className="card-title"
              data-bs-toggle="modal"
              data-bs-target={todoId}
            >
              {todo.title}
            </h3>
            <div>
              <EditOutlinedIcon
                data-bs-toggle="modal"
                data-bs-target={modalId}
              />
              <EditTodoModal
                todo={todo}
                setTodos={setTodos}
                setShowEditAlert={setShowEditAlert}
              />
              <ClearIcon className="ms-2" onClick={askDeleteTodo} />
            </div>
          </Title>

          <h5 className="card-title">{date}</h5>
          <TextTruncate>{todo.description}</TextTruncate>
          <Buttons className="d-flex justify-content-start">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                role="switch"
                onChange={updateCompleted}
                checked={todo.completed}
              />
              <label className="form-check-label">Complétée</label>
            </div>
          </Buttons>
        </div>
      </Container>
      <BigTodo todo={todo} setTodos={setTodos} modalId={modalId} />
      <DeleteModal
        modalId={`deleteModal${todo._id}`}
        handleDelete={deleteTodo}
        message={deleteMessage}
      />
      {/* Bouton caché pour simuler le click pour ouvrir le modal qui sert à valider la suppression d'un todo*/}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target={`#deleteModal${todo._id}`}
        ref={deleteButtonRef}
      ></button>
    </div>
  );
};

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

// Met ... si il n'y pas suffisamment de place pour toute la description
const TextTruncate = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 22px;
`;

const Title = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & svg,
  h3 {
    cursor: pointer;
  }
`;

const Container = styled.div`
  border-radius: 2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: ${({ $urgent, $completed }) =>
    $completed ? "#aaaaaa" : $urgent === "1" ? "#de7777" : "#e8e7f2"};
  .card-body {
    padding: 0.9rem 0.9rem;
  }
`;

export default Todo;
