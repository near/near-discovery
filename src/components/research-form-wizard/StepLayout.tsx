import styled from 'styled-components';
import { useResearchWizardStore } from '@/stores/researchWizard';

type StepLayoutProps = {
  children: JSX.Element;
  dismissForm: () => void;
  handleFormButton: () => void;
};

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
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-left: auto;
  color: #868682;
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

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressLabels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  margin-bottom: 5px;
  color: #888;
`;

const Progress = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ProgressBarSegment = styled.div<{ active: boolean }>`
  width: 32%;
  height: 3px;
  background: ${(props) => (props.active ? '#6200ee' : 'lightgray')};
  border-radius: 5px;
  margin-right: 2%;
  &:last-child {
    margin-right: 0;
  }
`;

const ProgressLabel = styled.span<{ active?: boolean }>`
  width: 33.3%;
  text-align: center;
  color: ${(props) => (props.active ? '#6200ee' : '#888')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
`;

const NextButton = styled.button<{ $disabled: boolean }>`
  padding: 10px 20px;
  background: ${(props) => (props.$disabled ? '#F3F3F2' : '#000000')};
  color: ${(props) => (props.$disabled ? '#C8C7C1' : 'white')};
  border: none;
  border-radius: 20px;
  cursor: ${(props) => (props.$disabled ? '' : 'pointer')};
  width: 100%;
  text-align: center;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background: ${(props) => (props.$disabled ? '#F3F3F2' : '#333333')};
  }
`;

export const StepLayout = (props: StepLayoutProps) => {
  const { children, dismissForm, handleFormButton } = props;
  const nextDisabled = useResearchWizardStore((state) => state.nextDisabled);
  const formSteps = useResearchWizardStore((state) => state.formSteps);

  return (
    <Card>
      <Header>
        <CloseButton onClick={dismissForm}>&times;</CloseButton>
      </Header>
      <ChildSection>{children}</ChildSection>
      <Footer>
        <ProgressContainer>
          <ProgressLabels>
            {formSteps.map((step, index) => (
              <ProgressLabel key={index} active={index === 0}>
                {step.progressDescription}
              </ProgressLabel>
            ))}
          </ProgressLabels>
          <Progress>
            {formSteps.map((step, index) => (
              <ProgressBarSegment key={index} active={index === 0} />
            ))}
          </Progress>
        </ProgressContainer>
        <NextButton disabled={nextDisabled} onClick={handleFormButton} $disabled={nextDisabled}>
          Next
        </NextButton>
      </Footer>
    </Card>
  );
};
