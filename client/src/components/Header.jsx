import { SuccessEditAlert } from "./SuccessEditAlert";
import { SuccessAlert } from "./SuccessAlert";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutModal from "./LogoutModal";
import PropTypes from "prop-types";
import { FilterBar } from "./FilterBar";

// Component representing the header bar displayed at the top of the task list, containing all the filter buttons, search functionality, and the add task button
const Header = ({
  todos,
  setTodos,
  showCompleted,
  setShowCompleted,
  setSearch,
  showEditAlert,
  setShowEditAlert,
  searchField,
  setSearchField,
}) => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container className="px-3 mb-3">
      <h1>TO DO</h1>
      {showAlert ? <SuccessAlert setShowAlert={setShowAlert} /> : ""}
      {showEditAlert ? (
        <SuccessEditAlert setShowEditAlert={setShowEditAlert} />
      ) : (
        ""
      )}
      <FilterBar
        setSearchField={setSearchField}
        todos={todos}
        setTodos={setTodos}
        setShowAlert={setShowAlert}
        showCompleted={showCompleted}
        searchField={searchField}
        setShowCompleted={setShowCompleted}
        setSearch={setSearch}
      />

      <LogoutIcon data-bs-toggle="modal" data-bs-target="#logout" />
      <LogoutModal handleLogout={handleLogout} />
    </Container>
  );
};

Header.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      urgent: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
  showCompleted: PropTypes.string.isRequired,
  setShowCompleted: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  showEditAlert: PropTypes.bool.isRequired,
  setShowEditAlert: PropTypes.func.isRequired,
  searchField: PropTypes.string.isRequired,
  setSearchField: PropTypes.func.isRequired,
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

export default Header;
