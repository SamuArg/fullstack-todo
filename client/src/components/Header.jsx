import FilterListIcon from "@mui/icons-material/FilterList";
import styled from "styled-components";
const Header = () => {
  return (
    <Container className="mt-4">
      <Filter className="mb-4">
        <FilterListIcon />
        <button type="button" className="btn btn-primary">
          +
        </button>
      </Filter>

      <button type="button" className="btn btn-danger mb-4">
        Se déconnecter
      </button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
