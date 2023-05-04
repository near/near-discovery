import React from 'react';

import AddModal from './AddModal';
import OpenModal from './OpenModal';
import OpenModuleModal from './OpenModuleModal';
import RenameModal from './RenameModal';
import { SaveDraftModal } from './SaveDraft';

export default function Modal({
  setShowModal,
  jpath,
  path,
  renameFile,
  near,
  widgetPath,
  widgetName,
  codeVisible,
  showModal,
  createFile,
  loadAndOpenFile,
  handleCommit,
}) {
  return (
    <>
      <RenameModal
        key={`rename-modal-${jpath}`}
        showModal={showModal}
        name={path?.name}
        onRename={renameFile}
        onHide={setShowModal}
      />
      <OpenModal showModal={showModal} onConfirm={loadAndOpenFile} onHide={setShowModal} />
      <OpenModuleModal showModal={showModal} onConfirm={loadAndOpenFile} onHide={setShowModal} />
      <AddModal onHide={setShowModal} showModal={showModal} setShowModal={setShowModal} createFile={createFile} />
      <SaveDraftModal
        showModal={showModal}
        onHide={setShowModal}
        near={near}
        widgetPath={widgetPath}
        widgetName={widgetName}
        type={path?.type}
        codeVisible={codeVisible}
        handleCommit={handleCommit}
      />
    </>
  );
}
