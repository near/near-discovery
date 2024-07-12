import { useCookiePreferences } from '@/hooks/useCookiePreferences';
import styled from 'styled-components';
import { useState } from 'react';
import Image from 'next/image';
import ThumbsUpIcon from './thumbs-up.svg';
import { recordResearchFromEvent } from '@/utils/analytics';
import Modal from 'react-bootstrap/Modal';
import { useResearchWizardEvents } from '@/hooks/useResearchWizardEvents';
import { StepLayout } from './StepLayout';
import { useResearchWizardStore } from '@/stores/researchWizard';

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

const MobileFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DesktopFormWrapper = styled.div`
  position: fixed;
  bottom: 1em;
  right: 1em;
  margin: 0 auto;
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

export const ResearchFormWizard = () => {
  const currentStepIndex = useResearchWizardStore((state) => state.currentStepIndex);
  const formSteps = useResearchWizardStore((state) => state.formSteps);
  const currentStepSubmission = useResearchWizardStore((state) => state.currentStepSubmission);
  const [matches, setMatches] = useState(true);
  const cookieData = useCookiePreferences();
  const { showMobileResearchForm, setShowMobileResearchForm, isResearchFormDismissed, setIsResearchFormDismissed } =
    useResearchWizardEvents();
  const [researchEventSent, setResearchEventSent] = useState(false);
  const [currentStep, setCurrentStep] = useState<JSX.Element>(formSteps[currentStepIndex].component());

  const dismissForm = () => {
    recordResearchFromEvent('close-research-form', { questionNumber: currentStepIndex + 1 });
    if (showMobileResearchForm) {
      setShowMobileResearchForm(false);
    } else {
      localStorage.setItem('researchFormDismissed', 'true');
      setIsResearchFormDismissed(true);
    }
  };

  const handleFormButton = () => {
    if (currentStepSubmission) {
      recordResearchFromEvent('research-form-submit', {
        questionNumber: currentStepIndex + 1,
        response: currentStepSubmission,
      });

      if (currentStepIndex < formSteps.length - 1) {
        setCurrentStep(formSteps[currentStepIndex + 1].component());
        useResearchWizardStore.setState({ currentStepIndex: currentStepIndex + 1 });
      } else {
        dismissForm();
      }
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

  if (!matches) {
    return (
      <>
        {showMobileResearchForm ? (
          <Modal style={{ zIndex: 10500 }} show={showMobileResearchForm} fullscreen>
            <Modal.Body>
              <MobileFormWrapper>
                <StepLayout dismissForm={dismissForm} handleFormButton={handleFormButton}>
                  {currentStep}
                </StepLayout>
              </MobileFormWrapper>
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
      <DesktopFormWrapper>
        <StepLayout dismissForm={dismissForm} handleFormButton={handleFormButton}>
          {currentStep}
        </StepLayout>
      </DesktopFormWrapper>
    </>
  );
};
