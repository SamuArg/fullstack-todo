import { useRef } from "react";
const DeleteModal = ({ handleDelete, message, modalId }) => {
  const input = useRef(null); // Lié au bouton annulé du modal
  const deleteTodo = () => {
    input.current.click(); // Permet de simuler la fermeture du modal avant de changer de page
    handleDelete();
  };
  return (
    <div className="modal" id={modalId} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Se déconnecter</h5>
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
              Non
            </button>
            <button
              type="button"
              onClick={deleteTodo}
              className="btn btn-primary"
            >
              Oui
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
