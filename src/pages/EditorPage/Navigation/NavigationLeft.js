import React from "react";
import { Nav } from "react-bootstrap";
import OpenCreateButton from "../buttons/OpenCreateButton";
import RenameButton from "../buttons/RenameButton";
import FileTab from "./FileTab";

export default ({
  filesObject,
  jpath,
  changeFile,
  setShowModal,
  closeFile,
  disable,
}) => (
  <Nav
    variant="pills mb-2 mt-2"
    activeKey={jpath}
    onSelect={(key) => {
      return changeFile(JSON.parse(key));
    }}
  >
    {Object.keys(filesObject)?.map((key) => (
      <FileTab
        key={key}
        file={filesObject[key]}
        closeFile={closeFile}
        jpath={jpath}
        disable={disable}
      />
    ))}
    <Nav.Item className="me-1">
      <OpenCreateButton setShowModal={setShowModal} disable={disable} />
      <RenameButton setShowModal={setShowModal} disable={disable} />
    </Nav.Item>
  </Nav>
);
