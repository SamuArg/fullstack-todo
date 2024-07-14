import { useEffect, useState } from "react";
import Header from "../components/Header";
import Todos from "../components/Todos";
import styled from "styled-components";
import readTodosRequest from "../api/readTodosRequest";
const Homepage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    readTodosRequest(localStorage.getItem("token"))
      .then((response) => {
        setTodos(response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Div className="pt-4 bg-gradient">
      <Header todos={todos} setTodos={setTodos} />
      <Todos todos={todos} setTodos={setTodos} />
    </Div>
  );
};

const Div = styled.div`
  background-color: #bde0fe;
  min-height: 100vh;
`;

export default Homepage;
