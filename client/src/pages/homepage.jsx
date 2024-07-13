import { useState } from "react";
import Header from "../components/Header";
import Todos from "../components/Todos";
import styled from "styled-components";
const Homepage = () => {
  const [todos, setTodos] = useState("");
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
