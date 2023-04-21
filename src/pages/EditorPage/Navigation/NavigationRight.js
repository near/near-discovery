import React from "react";
import { Nav } from "react-bootstrap";
import ForkButton from "../buttons/ForkButton";
import OnboardingPublishButton from "../buttons/OnboardingPublishButton";
import PublishButton from "../buttons/PublishButton";
import PublishDraftAsMainButton from "../buttons/PublishDraftAsMainButton";
import SaveDraftButton from "../buttons/SaveDraftButton";

export default ({
  jpath,
  widgetName,
  setShowModal,
  codeVisible,
  forkFile,
  near,
  path,
  metadata,
  isDraft,
  // boxRef,
  // step1Ref,
  refs,
  onboarding,
  currentStep,
  requestSignIn,
}) => (
  <Nav variant="pills mb-2 mt-2 ms-auto" activeKey={jpath}>
    <Nav.Item className="d-flex">
      <div>
        <SaveDraftButton widgetName={widgetName} setShowModal={setShowModal} />
      </div>
      <div>
        <ForkButton forkFile={forkFile} refs={refs} />
      </div>

      {isDraft ? (
        <PublishDraftAsMainButton
          widgetName={widgetName}
          near={near}
          path={path}
          codeVisible={codeVisible}
          metadata={metadata}
          ref={refs}
        />
      ) : onboarding ? (
        <OnboardingPublishButton
          currentStep={currentStep}
          refs={refs}
          requestSignIn={requestSignIn}
        />
      ) : (
        <PublishButton
          widgetName={widgetName}
          near={near}
          path={path}
          codeVisible={codeVisible}
          metadata={metadata}
          refs={refs}
        />
      )}
    </Nav.Item>
  </Nav>
);
