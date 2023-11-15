import React from 'react';

import { ModalTypes } from '../utils/const';

export default function SaveDraftButton({ widgetName, setShowModal, disable }) {
  return (
    <button
      className="btn btn-outline-primary me-2"
      disabled={!widgetName || disable.saveDraftButton}
      onClick={() => setShowModal(ModalTypes.SaveDraftModal)}
    >
      Save Version
    </button>
  );
}
