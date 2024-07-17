import Todo from "./Todo";

const Todos = ({ todos, setTodos, showCompleted }) => {
  const listMap = todos
    .filter((todo) =>
      showCompleted === "Toutes"
        ? true
        : showCompleted === "Complétées"
        ? todo.completed
        : !todo.completed
    )
    .map((todo) => {
      return (
        <div key={todo._id} className="col-md-4">
          <Todo todo={todo} setTodos={setTodos} />
        </div>
      );
    });

  return (
    <div className="container-fluid">
      <div className="row justify-content-start">{listMap}</div>
    </div>
  );
};

export default Todos;
