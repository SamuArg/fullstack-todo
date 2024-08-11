import styled from "styled-components";
export function SuccessEditAlert({ setShowEditAlert }) {
  return (
    <EditAlert className="alert alert-success alert-dismissible" role="alert">
      <div>Your task has been successfully modified</div>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={() => {
          setShowEditAlert(false);
        }}
      ></button>
    </EditAlert>
  );
}

// Positions the alert in the middle at the top of the screen
const EditAlert = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  z-index: 1050;
`;
