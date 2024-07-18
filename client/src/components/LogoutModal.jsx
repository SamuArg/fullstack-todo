import { useRef } from "react";
const LogoutModal = ({ handleLogout }) => {
  const input = useRef(null); // Lié au bouton annulé du modal
  const logout = () => {
    input.current.click(); // Permet de simuler la fermeture du modal avant de changer de page
    handleLogout();
  };
  return (
    <div className="modal" id="logout" tabIndex="-1">
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
            <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={input}
            >
              Annuler
            </button>
            <button type="button" onClick={logout} className="btn btn-primary">
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
