import { useState } from "react";
import Todo from "./Todo";
const Todos = (todos, setTodos) => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <Todo />
        </div>
        <div className="col-md-4">
          <Todo />
        </div>
        <div className="col-md-4">
          <Todo />
        </div>
        <div className="col-md-4">
          <Todo />
        </div>
        <div className="col-md-4">
          <Todo />
        </div>
        <div className="col-md-4">
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default Todos;
