import { useCookiePreferences } from '@/hooks/useCookiePreferences';
import { Motivation } from './Motivation';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Button } from '../lib/Button';
import Image from 'next/image';
import ThumbsUpIcon from './thumbs-up.svg';

const Wrapper = styled.div`
  position: fixed;
  bottom: 1em;
  right: 1em;
  margin: 0 auto;
`;
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

const Card = styled.div`
  width: 400px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-left: auto;
`;

const ChildSection = styled.div`
  flex-grow: 1;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Progress = styled.div`
  width: 100%;
  height: 5px;
  background: lightgray;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;

  &::after {
    content: '';
    display: block;
    width: 33%;
    height: 100%;
    background: #6200ee;
  }
`;

const NextButton = styled.button`
  padding: 10px 20px;
  background: #6200ee;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = formSteps[currentStepIndex].component();

  useEffect(() => {
    setMatches(window.matchMedia('(min-width: 1120px)').matches);
  }, []);

  // If the user has not acknowledged cookies, do not render the component
  if (!cookieData) {
    return null;
  }

  // If user is on the applications page do not render the component
  if (window.location.pathname.includes('/applications')) {
    return null;
  }

  if (!matches) {
    return (
      <MobileWrapper>
        <IconContainer>
          <Image src={ThumbsUpIcon} alt="ThumbsUpIcon" width={64} height={64} />
        </IconContainer>
        Share your feedback?
      </MobileWrapper>
    );
  }

  return (
    <Wrapper>
      <Card>
        <Header>
          <CloseButton>&times;</CloseButton>
        </Header>
        <ChildSection>{currentStep}</ChildSection>
        <Footer>
          <Progress />
          <NextButton>Next</NextButton>
        </Footer>
      </Card>
    </Wrapper>
  );
};
