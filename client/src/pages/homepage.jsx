import { useEffect, useState } from "react";
import Header from "../components/Header";
import Todos from "../components/Todos";
import styled from "styled-components";
import readTodosRequest from "../api/readTodosRequest";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const [showCompleted, setShowCompleted] = useState("Toutes");

  useEffect(() => {
    readTodosRequest(localStorage.getItem("token"))
      .then((response) => {
        setTodos(response);
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  return (
    <Div className="pt-4 bg-gradient">
      <Header
        todos={todos}
        setTodos={setTodos}
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
      />
      <Todos todos={todos} setTodos={setTodos} showCompleted={showCompleted} />
    </Div>
  );
};

const Div = styled.div`
  background-color: #bde0fe;
  min-height: 100vh;
`;

export default Homepage;
