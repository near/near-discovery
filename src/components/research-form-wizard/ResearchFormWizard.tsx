import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

import { useResearchWizardEvents } from '@/hooks/useResearchWizardEvents';
import { useResearchWizardStore } from '@/stores/researchWizard';
import { recordEventWithProps } from '@/utils/analytics';

import { StepLayout } from './StepLayout';
import { useCookieStore } from '@/stores/cookieData';

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
  border-radius: 50%;
  width: 48px;
  height: 48px;
  color: white;
  font-size: 24px;
  background-color: black;
`;

export const ResearchFormWizard = () => {
  const set = useResearchWizardStore((state) => state.set);
  const isResearchFormDismissed = useResearchWizardStore((state) => state.isResearchFormDismissed);
  const [matches, setMatches] = useState(true);
  const currentStepIndex = useResearchWizardStore((state) => state.currentStepIndex);
  const formSteps = useResearchWizardStore((state) => state.formSteps);
  const currentStepSubmission = useResearchWizardStore((state) => state.currentStepSubmission);
  const cookieData = useCookieStore((state) => state.cookieData);
  const { showMobileResearchForm, setShowMobileResearchForm, setIsResearchFormDismissed } = useResearchWizardEvents();
  const [researchEventSent, setResearchEventSent] = useState(false);
  const [currentStep, setCurrentStep] = useState<JSX.Element>(formSteps[currentStepIndex].component());

  useEffect(() => {
    setMatches(window.matchMedia('(min-width: 1120px)').matches);
  }, []);

  useEffect(() => {
    window.matchMedia('(min-width: 1120px)').addEventListener('change', (e) => setMatches(e.matches));
  }, []);

  const dismissForm = () => {
    recordEventWithProps('close-q3-developer-survey', { questionNumber: `${currentStepIndex + 1}` });
    if (showMobileResearchForm) {
      setShowMobileResearchForm(false);
    }
    setIsResearchFormDismissed(true);
    localStorage.setItem('researchFormDismissed', 'true');
  };

  const handleFormButton = () => {
    if (currentStepSubmission) {
      recordEventWithProps('q3-developer-survey-submission', {
        questionNumber: `${currentStepIndex + 1}`,
        questionTitle: formSteps[currentStepIndex].title,
        question: formSteps[currentStepIndex].question,
        question2: formSteps[currentStepIndex].question2 || null,
        ...currentStepSubmission,
      });

      if (currentStepIndex < formSteps.length - 1) {
        setCurrentStep(formSteps[currentStepIndex + 1].component());
        useResearchWizardStore.setState({ currentStepIndex: currentStepIndex + 1 });
      } else {
        setIsResearchFormDismissed(true);
        localStorage.setItem('researchFormDismissed', 'true');
      }
      set({ currentStepSubmission: '' });
    }
  };

  const handleShowMobileResearchForm = () => {
    setShowMobileResearchForm(true);
    recordEventWithProps('research-form-initial-view', { mobileFormView: 'true' });
  };

  const sendResearchEvent = () => {
    if (!researchEventSent) {
      recordEventWithProps('research-form-initial-view', { mobileFormView: 'false' });
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
                <StepLayout dismissForm={dismissForm} handleFormButton={handleFormButton} isMobile={true}>
                  {currentStep}
                </StepLayout>
              </MobileFormWrapper>
            </Modal.Body>
          </Modal>
        ) : (
          <MobileWrapper onClick={handleShowMobileResearchForm}>
            <IconContainer>
              <i className="ph ph-thumbs-up" />
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
        <StepLayout dismissForm={dismissForm} handleFormButton={handleFormButton} isMobile={false}>
          {currentStep}
        </StepLayout>
      </DesktopFormWrapper>
    </>
  );
};
