import { useEffect, useState } from "react";
import Header from "../components/Header";
import Todos from "../components/Todos";
import styled from "styled-components";
import readTodosRequest from "../api/readTodosRequest";
import { useNavigate } from "react-router-dom";
// Main page containing Header and tasks
const Homepage = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const [showCompleted, setShowCompleted] = useState("Toutes");
  const [search, setSearch] = useState("");
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [searchField, setSearchField] = useState("titre");

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
        searchField={searchField}
        setSearchField={setSearchField}
        todos={todos}
        setTodos={setTodos}
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
        search={search}
        setSearch={setSearch}
        showEditAlert={showEditAlert}
        setShowEditAlert={setShowEditAlert}
      />
      <Todos
        searchField={searchField}
        todos={todos}
        setTodos={setTodos}
        showCompleted={showCompleted}
        search={search}
        setShowEditAlert={setShowEditAlert}
      />
    </Div>
  );
};

const Div = styled.div`
  background-color: #bde0fe;
  min-height: 100vh;
`;

export default Homepage;
