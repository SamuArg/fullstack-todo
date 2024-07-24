import { useRef } from "react";
import PropTypes from "prop-types";
// Component representing the window that appears when the user wants to delete a task
const DeleteModal = ({ handleDelete, message, modalId }) => {
  const input = useRef(null); // Related to the cancel button of the modal
  const deleteTodo = () => {
    input.current.click(); // Allows simulating the closing of the modal before changing the page
    handleDelete();
  };
  return (
    <div className="modal" id={modalId} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete a task</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={input}
            >
              No
            </button>
            <button
              type="button"
              onClick={deleteTodo}
              className="btn btn-primary"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  modalId: PropTypes.string.isRequired,
};

export default DeleteModal;
