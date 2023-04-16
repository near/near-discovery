import React from "react";
import { Nav } from "react-bootstrap";
import ForkButton from "../Buttons/ForkButton";
import PublishButton from "../Buttons/PublishButton";
import PublishDraftAsMainButton from "../Buttons/PublishDraftAsMainButton";
import SaveDraftButton from "../Buttons/SaveDraftButton";

export default ({
  jpath,
  widgetName,
  setShowModal,
  code,
  forkFile,
  toPath,
  near,
  path,
  metadata,
  isDraft,
}) => (
  <Nav variant="pills mb-2 mt-2 ms-auto" activeKey={jpath}>
    <Nav.Item className="">
      <SaveDraftButton widgetName={widgetName} setShowModal={setShowModal} />
      <ForkButton
        widgetName={widgetName}
        code={code}
        forkFile={forkFile}
        toPath={toPath}
      />

      {isDraft ? (
        <PublishDraftAsMainButton
          widgetName={widgetName}
          near={near}
          path={path}
          code={code}
          metadata={metadata}
        />
      ) : (
        <PublishButton
          widgetName={widgetName}
          near={near}
          path={path}
          code={code}
          metadata={metadata}
        />
      )}
    </Nav.Item>
  </Nav>
);
