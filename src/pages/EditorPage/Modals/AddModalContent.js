import React from "react";
import { DISABLE_MODULES, Filetype, ModalTypes } from "../utils/const";

export default ({ setShowModal, handleNew }) => (
  <>
    <div class="btn-group w-100" role="group" aria-label="Basic example">
      <button
        className="btn btn-outline-success w-50 mr-5"
        onClick={() => setShowModal(ModalTypes.OpenModal)}
      >
        Open Component
      </button>
      <button
        className="btn btn-success w-50"
        onClick={() => handleNew(Filetype.Widget)}
      >
        Create New Component
      </button>
    </div>
    {!DISABLE_MODULES && (
      <>
        <div className="w-100 text-center text-secondary mb-2">or</div>
        <div class="btn-group w-100" role="group" aria-label="Basic example">
          <button
            className="btn btn-outline-primary w-50 mr-5"
            onClick={() => setShowModal(ModalTypes.OpenModuleModal)}
          >
            Open Module
          </button>
          <button
            className="btn btn-primary w-50"
            onClick={() => handleNew(Filetype.Module)}
          >
            Create New Module
          </button>
        </div>
      </>
    )}
  </>
);
