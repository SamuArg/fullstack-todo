import styled from "styled-components";

export function SuccessAlert({ setShowAlert }) {
  return (
    <Alert className="alert alert-success alert-dismissible" role="alert">
      <div>Your task has been successfully created</div>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={() => {
          setShowAlert(false);
        }}
      ></button>
    </Alert>
  );
}
// Positions the alert in the middle at the top of the screen
const Alert = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  z-index: 1050;
`;
