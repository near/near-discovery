import React from 'react';
import { Nav } from 'react-bootstrap';

import ForkButton from '../Buttons/ForkButton';
import OnboardingPublishButton from '../Buttons/OnboardingPublishButton';
import PublishButton from '../Buttons/PublishButton';
import PublishDraftAsMainButton from '../Buttons/PublishDraftAsMainButton';
import SaveDraftButton from '../Buttons/SaveDraftButton';

const NavigationRight = ({
  jpath,
  widgetName,
  setShowModal,
  forkFile,
  near,
  path,
  metadata,
  isDraft,
  refs,
  onboarding,
  currentStep,
  requestSignIn,
  disable,
  handleCommit,
  accountId,
  filesObject,
}) => {
  const code = filesObject[JSON.stringify(path)]?.codeVisible;

  return (
    <Nav variant="pills mb-2 mt-2 ms-auto" activeKey={jpath}>
      <Nav.Item className="d-flex">
        <div>
          <SaveDraftButton widgetName={widgetName} setShowModal={setShowModal} disable={disable} />
        </div>
        <div>
          <ForkButton forkFile={forkFile} refs={refs} disable={disable} />
        </div>

        {isDraft ? (
          <PublishDraftAsMainButton
            widgetName={widgetName}
            near={near}
            path={path}
            code={code}
            metadata={metadata}
            ref={refs}
            disable={disable}
            handleCommit={handleCommit}
          />
        ) : onboarding && !accountId ? (
          <OnboardingPublishButton
            currentStep={currentStep}
            refs={refs}
            requestSignIn={requestSignIn}
            disable={disable}
          />
        ) : (
          <PublishButton
            widgetName={widgetName}
            near={near}
            path={path}
            code={code}
            metadata={metadata}
            disable={disable}
            handleCommit={handleCommit}
            refs={refs}
          />
        )}
      </Nav.Item>
    </Nav>
  );
};

export default NavigationRight;
