import { useResearchFormEvents } from '@/hooks/useResearchWizardEvents';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  bottom: 1em;
  right: 1em;
  margin: 0 auto;
`;

const MobileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

type ResearchFormProps = {
  showMobileResearchForm: boolean;
  dismissForm: () => void;
  currentStep: JSX.Element;
};
const ResearchForm = (props: ResearchFormProps) => {
  const { dismissForm, currentStep } = props;
  const { showMobileResearchForm } = useResearchFormEvents();

  if (showMobileResearchForm) {
    return (
      <MobileWrapper>
        <Card>
          <Header>
            <CloseButton onClick={dismissForm}>&times;</CloseButton>
          </Header>
          <ChildSection>{currentStep}</ChildSection>
          <Footer>
            <Progress />
            <NextButton>Next</NextButton>
          </Footer>
        </Card>
      </MobileWrapper>
    );
  }

  return (
    <Wrapper>
      <Card>
        <Header>
          <CloseButton onClick={dismissForm}>&times;</CloseButton>
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
export default ResearchForm;
