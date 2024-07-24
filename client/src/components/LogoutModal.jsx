import { useRef } from "react";
import PropTypes from "prop-types";
// Component representing the window that appears when the user clicks on the logout button
const LogoutModal = ({ handleLogout }) => {
  const input = useRef(null); // Related to the cancel button of the modal
  const logout = () => {
    input.current.click(); // Allows simulating the closing of the modal before changing the page
    handleLogout();
  };
  return (
    <div className="modal" id="logout" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Log out</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to log out?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={input}
            >
              Cancel
            </button>
            <button type="button" onClick={logout} className="btn btn-primary">
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

LogoutModal.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default LogoutModal;
