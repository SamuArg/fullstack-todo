import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
const Header = ({ todos, setTodos }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Vous êtes bien déconnecté");
    navigate("/login");
  };
  return (
    <Container className="px-3">
      <Filter className="mb-4">
        <FilterListIcon />
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modal"
        >
          <AddIcon />
        </button>
        <Modal setTodos={setTodos} />
      </Filter>
      <h1>TO DO</h1>
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
