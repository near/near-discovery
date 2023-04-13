import React from "react";
import RenameModal from "./RenameModal";
import OpenModal from "./OpenModal";
import OpenModuleModal from "./OpenModuleModal";
import AddModal from "./AddModal";
import CreateModal from "./CreateModal";
import { SaveDraftModal } from "../../../components/SaveDraft";

export default function Modals({
  hideAllModals,
  showRenameModal,
  setShowRenameModal,
  showOpenModal,
  setShowOpenModal,
  showOpenModuleModal,
  setShowOpenModuleModal,
  showSaveDraftModal,
  showAddModal,
  showCreateModal,
  jpath,
  path,
  renameFile,
  loadAndOpenFile,
  createNewFile,
  near,
  widgetPath,
  widgetName,
  code,
}) {
  return (
    <>
      <RenameModal
        key={`rename-modal-${jpath}`}
        show={showRenameModal}
        name={path?.name}
        onRename={renameFile}
        onHide={hideAllModals}
      />
      <OpenModal
        show={showOpenModal}
        onConfirm={loadAndOpenFile}
        onHide={hideAllModals}
      />
      <OpenModuleModal
        show={showOpenModuleModal}
        onConfirm={loadAndOpenFile}
        onHide={hideAllModals}
      />
      <AddModal
        show={showAddModal}
        onOpenComponent={setShowOpenModal}
        onNewComponent={setShowRenameModal}
        onOpenModule={setShowOpenModuleModal}
        onNewModule={setShowRenameModal}
        onHide={hideAllModals}
        createNewFile={createNewFile}
      />
      <CreateModal
        show={showCreateModal}
        onConfirm={createNewFile}
        onHide={hideAllModals}
      />
      <SaveDraftModal
        show={showSaveDraftModal}
        onHide={hideAllModals}
        near={near}
        widgetPath={widgetPath}
        widgetName={widgetName}
        type={path?.type}
        code={code}
      />
    </>
  );
}
