import React, { useState } from "react";
import { CommitButton } from "near-social-vm";
import Modal from "react-bootstrap/Modal";
import { ModalTypes } from "../pages/EditorPage/utils/const";

export const SaveDraftModal = ({
  codeVisible,
  showModal,
  onHide,
  near,
  widgetPath,
  widgetName,
  type,
  metadata,
}) => {
  const [commitMessage, setCommitMessage] = useState("");

  const widgetPathFull = widgetPath + "/branch/draft";

  const commitButtonData = {
    post: {
      commit: {
        text: commitMessage,
        type: "md",
        keys: [widgetPathFull],
      },
    },
    [type]: {
      [widgetName]: {
        branch: {
          draft: {
            "": codeVisible,
            metadata,
          },
        },
      },
    },
  };

  const handleMessage = (e) => setCommitMessage(e.target.value);

  const onCancel = () => {
    setCommitMessage("");
    onHide();
  };

  return (
    <Modal
      centered
      scrollable
      show={showModal === ModalTypes.SaveDraftModal}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Save to Version History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="text-secondary mb-4">
            Save and commit your changes to the on-chain version history. Give
            your version a description what changed. Then save to the on-chain
            version history.
          </div>
          <label htmlFor="rename-input" className="form-label text-secondary">
            Describe what changed
          </label>
          <input
            className="form-control"
            id="widget-src-input"
            type="text"
            value={commitMessage}
            onChange={handleMessage}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <CommitButton
          className="btn btn-primary"
          near={near}
          onCommit={onHide}
          data={commitButtonData}
        >
          Save
        </CommitButton>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
};
