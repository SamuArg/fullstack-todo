import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
const Todo = () => {
  return (
    <div>
      <div className="card col-sm">
        <div className="card-body">
          <Title>
            <h3 className="card-title">Title</h3>
            <DeleteIcon></DeleteIcon>
          </Title>

          <h5 className="card-title">Date</h5>
          <TextTruncate>text</TextTruncate>
          <Buttons>
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
            <button type="button" className="btn btn-secondary">
              Modifier
            </button>
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
