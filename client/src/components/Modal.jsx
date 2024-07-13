import styled from "styled-components";

const Modal = () => {
  const date = new Date().toISOString().slice(0, 10);
  return (
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
              Nouvelle tâche
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group row mb-2">
                <label className="col-3" htmlFor="title">
                  Titre
                </label>
                <div className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                  />
                </div>
              </div>
              <div className="form-group row mb-2">
                <label className="col-3" htmlFor="date">
                  Date
                </label>
                <div className="col-4">
                  <input type="date" id="date" min={date} required />
                </div>
              </div>
              <div className="form-group row mb-2">
                <label className="col-3" htmlFor="description">
                  Description
                </label>
                <div className="col">
                  <Textarea
                    maxLength="140"
                    className="form-control"
                    id="description"
                    required
                  />
                </div>
              </div>
              <div className="col-4">
                <select
                  id="importance"
                  className="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option selected>Importance</option>
                  <option value="0">Normale</option>
                  <option value="1">Urgente</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Annuler
            </button>
            <button type="button" className="btn btn-primary">
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Textarea = styled.textarea`
  resize: none;
`;

export default Modal;
