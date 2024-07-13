import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
const Header = () => {
  return (
    <Container className="px-3">
      <Filter className="mb-4">
        <FilterListIcon />
        <button type="button" className="btn btn-primary">
          <AddIcon />
        </button>
      </Filter>
      <h1>TODO</h1>
      <button type="button" className="btn btn-danger mb-4">
        Se déconnecter
      </button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  & * {
    cursor: pointer;
  }
`;

export default Header;
