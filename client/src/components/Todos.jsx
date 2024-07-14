import Todo from "./Todo";
const Todos = ({ todos, setTodos }) => {
  const sortedTodos = todos.sort((a, b) => new Date(a.date) - new Date(b.date));
  const listMap = sortedTodos.map((todo) => {
    return (
      <div key={todo._id} className="col-md-4">
        <Todo todo={todo} />
      </div>
    );
  });
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">{listMap}</div>
    </div>
  );
};

export default Todos;
