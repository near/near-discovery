import React from "react";
import { Nav } from "react-bootstrap";
import OpenCreateButton from "../Buttons/OpenCreateButton";
import RenameButton from "../Buttons/RenameButton";
import FileTab from "./FileTab";

export default ({
  filesObject,
  jpath,
  changeFile,
  setShowModal,
  closeFile,
}) => {
  return (
    <Nav
      variant="pills mb-2 mt-2"
      activeKey={jpath}
      onSelect={(key) => changeFile(JSON.parse(key))}
    >
      {Object.values(filesObject)?.map((file) => (
        <FileTab file={file} closeFile={closeFile} jpath={jpath} />
      ))}
      <Nav.Item className="me-1">
        <OpenCreateButton setShowModal={setShowModal} />
        <RenameButton setShowModal={setShowModal} />
      </Nav.Item>
    </Nav>
  );
};
