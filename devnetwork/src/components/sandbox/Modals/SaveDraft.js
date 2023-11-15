import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import { VmCommitButton } from '@/components/vm/VmCommitButton';

import { ModalTypes } from '../utils/const';

export const SaveDraftModal = ({
  showModal,
  onHide,
  widgetPath,
  widgetName,
  type,
  metadata,
  handleCommit,
  path,
  filesObject,
}) => {
  const [commitMessage, setCommitMessage] = useState('');
  const widgetPathFull = widgetPath + '/branch/draft';
  const codeVisible = filesObject[JSON.stringify(path)]?.codeVisible;

  const commitButtonData = {
    post: {
      commit: {
        text: commitMessage,
        type: 'md',
        keys: [widgetPathFull],
      },
    },
    [type]: {
      [widgetName]: {
        branch: {
          draft: {
            '': codeVisible,
            metadata,
          },
        },
      },
    },
  };

  const handleMessage = (e) => setCommitMessage(e.target.value);

  const onCancel = () => {
    setCommitMessage('');
    onHide();
  };

  return (
    <Modal centered scrollable show={showModal === ModalTypes.SaveDraftModal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Save to Version History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="text-secondary mb-4">
            Save and commit your changes to the on-chain version history. Give your version a description what changed.
            Then save to the on-chain version history.
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
        <VmCommitButton
          className="btn btn-primary"
          onCommit={onHide}
          data={commitButtonData}
          handleCommit={handleCommit}
        >
          Save
        </VmCommitButton>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
};
