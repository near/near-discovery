import React, { useCallback, useEffect, useMemo, useState } from "react";
import ls from "local-storage";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";
import { useHistory, useParams } from "react-router-dom";
import {
  Widget,
  useCache,
  useNear,
  CommitButton,
  useAccountId,
} from "near-social-vm";
import { Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import RenameModal from "../../../components/Editor/RenameModal";
import OpenModal from "../../../components/Editor/OpenModal";
import OpenModuleModal from "../../../components/Editor/OpenModuleModal";
import AddModal from "../../../components/Editor/AddModal";
import CreateModal from "../../../components/Editor/CreateModal";
import { SaveDraftModal } from "../../../components/SaveDraft";
import styled from "styled-components";

export default function Modals({
  jpath,
  showRenameModal,
  path,
  renameFile,
  setShowRenameModal,
  showOpenModal,
  loadFile,
  setShowOpenModal,
  showOpenModuleModal,
  setShowOpenModuleModal,
  setShowAddModal,
  createNewFile,
  setShowCreateModal,
  showSaveDraftModal,
  near,
  widgetPath,
  widgetName,
  code,
  showAddModal,
  showCreateModal,
}) {
  return (
    <>
      <RenameModal
        key={`rename-modal-${jpath}`}
        show={showRenameModal}
        name={path?.name}
        onRename={(newName) => renameFile(newName, code)}
        onHide={() => setShowRenameModal(false)}
      />
      <OpenModal
        show={showOpenModal}
        onOpen={(newName) => loadFile(newName)}
        onHide={() => setShowOpenModal(false)}
      />
      <OpenModuleModal
        show={showOpenModuleModal}
        onOpen={(newName) => loadFile(newName, Filetype.Module)}
        onHide={() => setShowOpenModuleModal(false)}
      />
      <AddModal
        show={showAddModal}
        onOpen={() => (setShowAddModal(false), setShowOpenModal(true))}
        onNew={() => (
          setShowAddModal(false),
          setShowRenameModal(true),
          createNewFile(Filetype.Widget)
        )}
        onOpenModule={() => (
          setShowAddModal(false), setShowOpenModuleModal(true)
        )}
        onNewModule={() => (
          setShowAddModal(false),
          setShowRenameModal(true),
          createNewFile(Filetype.Module)
        )}
        onHide={() => setShowAddModal(false)}
      />
      <CreateModal
        show={showCreateModal}
        onOpen={(newName) => loadFile(newName)}
        onNew={() => {
          createNewFile(Filetype.Widget);
        }}
        onHide={() => setShowCreateModal(false)}
      />
      <SaveDraftModal
        show={showSaveDraftModal}
        onHide={() => setShowSaveDraftModal(false)}
        near={near}
        widgetPath={widgetPath}
        widgetName={widgetName}
        type={path?.type}
        code={code}
      />
    </>
  );
}
