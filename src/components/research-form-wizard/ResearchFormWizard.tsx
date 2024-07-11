import { useCookiePreferences } from '@/hooks/useCookiePreferences';
import { Motivation } from './Motivation';
import styled from 'styled-components';
import { use, useEffect, useState } from 'react';
import { Button } from '../lib/Button';
import Image from 'next/image';
import ThumbsUpIcon from './thumbs-up.svg';
import { recordResearchFromEvent } from '@/utils/analytics';
import Modal from 'react-bootstrap/Modal';
import ResearchForm from './ResearchForm';
import { useResearchFormEvents } from '@/hooks/useResearchWizardEvents';

// float the button to the bottom center of the screen
const MobileWrapper = styled.div`
  width: 276px;
  height: 72px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: white;
  color: #000000;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  color: white;
`;

interface ResearchStep {
  title: string;
  component: () => JSX.Element;
}

const formSteps: ResearchStep[] = [
  {
    title: 'motivation',
    component: () => <Motivation />,
  },
  {
    title: 'user type',
    component: () => <div>Step 2</div>,
  },
  {
    title: 'Step 3',
    component: () => <div>Step 3</div>,
  },
];
export const ResearchFormWizard = () => {
  const [matches, setMatches] = useState(true);
  const cookieData = useCookiePreferences();
  const { showMobileResearchForm, setShowMobileResearchForm, isResearchFormDismissed, setIsResearchFormDismissed } =
    useResearchFormEvents();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [researchEventSent, setResearchEventSent] = useState(false);

  const currentStep = formSteps[currentStepIndex].component();

  useEffect(() => {
    setMatches(window.matchMedia('(min-width: 1120px)').matches);
  }, []);

  const dismissForm = () => {
    recordResearchFromEvent('close-research-form', { questionNumber: currentStepIndex + 1 });
    if (showMobileResearchForm) {
      setShowMobileResearchForm(false);
    } else {
      localStorage.setItem('researchFormDismissed', 'true');
      setIsResearchFormDismissed(true);
    }
  };

  const handleShowMobileResearchForm = () => {
    setShowMobileResearchForm(true);
    recordResearchFromEvent('research-form-initial-view', { mobileFormView: true });
  };

  const sendResearchEvent = () => {
    if (!researchEventSent) {
      console.log('sendResearchEvent');
      recordResearchFromEvent('research-form-initial-view', { mobileFormView: false });
      setResearchEventSent(true);
    }
  };

  // If the user has not acknowledged cookies, do not render the component
  if (!cookieData || isResearchFormDismissed) {
    return null;
  }

  // If user is on the applications page do not render the component
  if (window.location.pathname.includes('/applications')) {
    return null;
  }

  console.log('matches', matches);
  if (!matches) {
    return (
      <>
        {showMobileResearchForm ? (
          <Modal style={{ zIndex: 10500 }} show={showMobileResearchForm} fullscreen>
            <Modal.Body>
              <ResearchForm
                showMobileResearchForm={showMobileResearchForm}
                dismissForm={dismissForm}
                currentStep={currentStep}
              />
            </Modal.Body>
          </Modal>
        ) : (
          <MobileWrapper onClick={handleShowMobileResearchForm}>
            <IconContainer>
              <Image src={ThumbsUpIcon} alt="ThumbsUpIcon" width={64} height={64} />
            </IconContainer>
            Share your feedback?
          </MobileWrapper>
        )}
      </>
    );
  }

  return (
    <>
      {sendResearchEvent()}
      <ResearchForm
        showMobileResearchForm={showMobileResearchForm}
        dismissForm={dismissForm}
        currentStep={currentStep}
      />
    </>
  );
};
