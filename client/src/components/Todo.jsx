import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import updateTodoRequest from "../api/updateTodoRequest";
const Todo = ({ todo, setTodos }) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const date = todo.date.split("T")[0];
  return (
    <div className="mb-4">
      <Container
        className="card col-sm"
        urgent={todo.urgent}
        completed={todo.completed.toString()}
      >
        <div className="card-body">
          <Title>
            <h3 className="card-title">{todo.title}</h3>
            <div>
              <EditOutlinedIcon />
              <ClearIcon className="ms-2" />
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
              <label htmlFor="" className="form-check-label">
                Complétée
              </label>
            </div>
          </Buttons>
        </div>
      </Container>
    </div>
  );
};

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const TextTruncate = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & svg {
    cursor: pointer;
  }
`;

const Container = styled.div`
  border-radius: 2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: ${({ urgent, completed }) =>
    completed === "true" ? "#aaaaaa" : urgent === "1" ? "#de7777" : "#e8e7f2"};
`;

export default Todo;
