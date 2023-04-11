import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function OpenModuleModal(props) {
  const onHide = props.onHide;
  const onOpen = props.onOpen;
  const onNew = props.onNew;
  const show = props.show;

  const [widgetSrc, setWidgetSrc] = useState("");

  return (
    <Modal centered scrollable show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Open a Module</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="widget-src-input" className="form-label text-secondary">
          Module name <span className="text-muted">(or path)</span>
        </label>
        <input
          className="form-control"
          id="widget-src-input"
          type="text"
          value={widgetSrc}
          onChange={(e) =>
            setWidgetSrc(e.target.value.replaceAll(/[^a-zA-Z0-9_.\-\/]/g, ""))
          }
        />
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-primary"
          disabled={!widgetSrc}
          onClick={(e) => {
            e.preventDefault();
            onOpen(widgetSrc);
            setWidgetSrc("");
            onHide();
          }}
        >
          Open
        </button>
        <button className="btn btn-secondary" onClick={onHide}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}
