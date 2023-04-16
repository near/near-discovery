import React from "react";
import { Nav } from "react-bootstrap";
import ForkButton from "../buttons/ForkButton";
import PublishButton from "../buttons/PublishButton";
import PublishDraftAsMainButton from "../buttons/PublishDraftAsMainButton";
import SaveDraftButton from "../buttons/SaveDraftButton";

export default function NavigationRight({
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
}) {
  return (
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
}
