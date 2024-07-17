import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import NewTodoModal from "./NewTodoModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = ({ todos, setTodos, showCompleted, setShowCompleted }) => {
  const navigate = useNavigate();
  const [sortDate, setSortDate] = useState(true);
  const [sortUrgent, setSortUrgent] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Vous êtes bien déconnecté");
    navigate("/login");
  };

  const handleSortDate = () => {
    setSortDate(!sortDate);
    const sortedTodos = [...todos].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (sortDate) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    setTodos(sortedTodos);
  };

  const handleSortUrgent = () => {
    setSortUrgent(!sortUrgent);
    const sortedTodos = [...todos].sort((a, b) => {
      if (sortUrgent) {
        return parseInt(a.urgent) - parseInt(b.urgent);
      } else {
        return parseInt(b.urgent) - parseInt(a.urgent);
      }
    });
    setTodos(sortedTodos);
  };

  const handleShowCompleted = () => {
    setShowCompleted((previous) => {
      if (previous === "Toutes") {
        return "Complétées";
      } else if (previous === "Complétées") {
        return "Non-Complétées";
      } else {
        return "Toutes";
      }
    });
  };

  return (
    <Container className="px-3">
      <h1>TO DO</h1>
      <Filter className="mb-4">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modal"
        >
          <AddIcon />
        </button>
        <NewTodoModal setTodos={setTodos} />
        <button
          type="button"
          onClick={handleSortDate}
          className="btn btn-primary"
        >
          {sortDate ? (
            <i className="bi bi-sort-down"></i>
          ) : (
            <i className="bi bi-sort-up"></i>
          )}{" "}
          Date
        </button>
        <button
          type="button"
          onClick={handleSortUrgent}
          className="btn btn-primary"
        >
          {" "}
          {sortUrgent ? (
            <i className="bi bi-sort-down"></i>
          ) : (
            <i className="bi bi-sort-up"></i>
          )}{" "}
          Importance
        </button>
        <button
          type="button"
          onClick={handleShowCompleted}
          className="btn btn-primary"
        >
          Montrer : {showCompleted}
        </button>
      </Filter>

      <LogoutIcon onClick={handleLogout} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  & svg {
    cursor: pointer;
  }
`;

const Filter = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

export default Header;
