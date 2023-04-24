import React from "react";
import { ModalTypes } from "../utils/const";

export default ({ setShowModal, disable }) => (
  <button
    disabled={disable.openCreateButton}
    className="btn btn-success"
    onClick={() => setShowModal(ModalTypes.AddModal)}
    style={{
      fontSize: "20px",
      height: "40px",
      lineHeight: "38px",
      paddingTop: "0",
      marginTop: "0",
    }}
  >
    <i className="bi bi-plus"></i>
  </button>
);
