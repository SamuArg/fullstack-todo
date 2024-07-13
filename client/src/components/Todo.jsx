import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
const Todo = () => {
  return (
    <div className="mb-4">
      <div className="card col-sm">
        <div className="card-body">
          <Title>
            <h3 className="card-title">Title</h3>
            <div>
              <button type="button" className="btn btn-secondary btn-sm">
                Modifier
              </button>
              <ClearIcon className="ms-2" />
            </div>
          </Title>

          <h5 className="card-title">Date</h5>
          <TextTruncate>text</TextTruncate>
          <Buttons className="d-flex justify-content-start">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                role="switch"
              />
              <label htmlFor="" className="form-check-label">
                Complétée
              </label>
            </div>
          </Buttons>
        </div>
      </div>
    </div>
  );
};

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const TextTruncate = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & svg {
    cursor: pointer;
  }
`;

export default Todo;
