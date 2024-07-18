import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import NewTodoModal from "./NewTodoModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutModal from "./LogoutModal";

const Header = ({
  todos,
  setTodos,
  showCompleted,
  setShowCompleted,
  setSearch,
}) => {
  const navigate = useNavigate();
  const [sortDate, setSortDate] = useState(true);
  const [sortUrgent, setSortUrgent] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container className="px-3 mb-3">
      <h1>TO DO</h1>
      <Filter>
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
        <input
          className="form-control"
          type="search"
          placeholder="Chercher par titre"
          aria-label="Search"
          onChange={handleSearch}
        ></input>
      </Filter>

      <LogoutIcon data-bs-toggle="modal" data-bs-target="#logout" />
      <LogoutModal handleLogout={handleLogout} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  & svg {
    cursor: pointer;
  }
`;

const Filter = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  input {
    max-width: 10vw;
    min-width: 170px;
  }
`;

export default Header;
