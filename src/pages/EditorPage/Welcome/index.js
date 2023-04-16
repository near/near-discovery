import React from "react";
import { ModalTypes } from "../utils/const";

export default function Welcome({ setShowModal, createFile, showEditor }) {
  return (
    <div
      className={`text-center d-flex justify-content-center min-vh-100 ${
        showEditor ? `visually-hidden` : ``
      }`}
    >
      <div
        className="container-fluid mt-5"
        style={{
          width: "460px",
        }}
      >
        <h4 style={{ lineHeight: "50px" }}>
          Welcome to the Component Sandbox!
        </h4>
        <p className="text-secondary">
          Use this sandbox to create, inspect, modify, and compose components to
          create new experiences on NEAR.
        </p>
        <div className="d-flex justify-content-center mt-5">
          <button
            className="btn btn-outline-success mb-3"
            style={{ width: "250px" }}
            onClick={() => setShowModal(ModalTypes.OpenModal)}
          >
            Open Component
          </button>
        </div>
        <div className="w-100 text-center text-secondary mb-3">or</div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-success mb-4"
            style={{ width: "250px" }}
            onClick={() => (setShowModal(), createFile(Filetype.Widget))}
          >
            Create New Component
          </button>
        </div>
      </div>
    </div>
  );
}
