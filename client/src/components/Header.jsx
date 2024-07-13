import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import Modal from "./Modal";
const Header = () => {
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
        <Modal />
        <div
          className="modal fade"
          id="modal"
          tabIndex="-1"
          aria-labelledby="ModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </Filter>
      <h1>TO DO</h1>
      <LogoutIcon />
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
