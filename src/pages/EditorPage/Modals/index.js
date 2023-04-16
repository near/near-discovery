import React from "react";
import RenameModal from "./RenameModal";
import OpenModal from "./OpenModal";
import OpenModuleModal from "./OpenModuleModal";
import AddModal from "./AddModal";
import { SaveDraftModal } from "../../../components/SaveDraft";

export default function Modals({
  setShowModal,
  jpath,
  path,
  renameFile,
  near,
  widgetPath,
  widgetName,
  code,
  showModal,
  createFile,
  loadAndOpenFile,
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
      <OpenModal
        showModal={showModal}
        onConfirm={loadAndOpenFile}
        onHide={setShowModal}
      />
      <OpenModuleModal
        showModal={showModal}
        onConfirm={loadAndOpenFile}
        onHide={setShowModal}
      />
      <AddModal
        onHide={setShowModal}
        showModal={showModal}
        setShowModal={setShowModal}
        createFile={createFile}
      />
      <SaveDraftModal
        showModal={showModal}
        onHide={setShowModal}
        near={near}
        widgetPath={widgetPath}
        widgetName={widgetName}
        type={path?.type}
        code={code}
      />
    </>
  );
}
