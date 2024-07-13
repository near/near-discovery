import { useResearchWizardStore } from '@/stores/researchWizard';
import { isValidEmail } from '@/utils/form-validation';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
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

const Title = styled.h2`
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Description = styled.p`
  font-size: 14px;
  color: #555;
`;

const SubTitle = styled.p`
  font-weight: bold;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const RadioInput = styled.input`
  appearance: none;
  border: 1px solid lightgray;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  position: relative;
  cursor: pointer;

  &:checked {
    border-color: #6e56cf;
    background-color: #aa99ec;
  }

  &:checked::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 50%;
  }
`;

const EmailInput = styled.input<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  margin: 10px 0;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 100%;
`;

const TermsLabel = styled.label<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  align-items: flex-start;
  gap: 10px;
  font-size: 12px;
  color: #555;
  margin: 10px 0;
`;

const TermsCheckbox = styled.input`
  appearance: none;
  border: 1px solid lightgray;
  border-radius: 4px;
  width: 16px;
  height: 16px;
  position: relative;
  cursor: pointer;
  flex-shrink: 0; /* Prevent the checkbox from shrinking */

  &:checked {
    border-color: #6e56cf;
    background-color: #aa99ec;
  }

  &:checked::before {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 10px;
  }
`;

const FollowUpComponent = () => {
  const set = useResearchWizardStore((state) => state.set);
  const [interest, setInterest] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [agreed, setAgreed] = useState<boolean>(false);

  useEffect(() => {
    const validEmail = isValidEmail(email);
    let isDisabled = true;
    if (validEmail && agreed) {
      isDisabled = false;
    }

    set({
      nextDisabled: isDisabled,
      currentStepSubmission: { optIn: interest, emailAddress: email, agreedToTerms: agreed },
    });
  }, [interest, email, agreed, set]);

  return (
    <>
      <Header>
        <Title>Help us with Research</Title>
      </Header>
      <Description>
        If you submit your email, you consent to be contacted and may be asked to participate in a future paid study
        regarding the Near Ecosystem. Your feedback will be sincerely appreciated as it ensures we are building the
        right things to serve your needs.
      </Description>
      <SubTitle>Are you interested?</SubTitle>
      <RadioGroup>
        <RadioLabel>
          <RadioInput
            type="radio"
            name="interest"
            value="Yes, please!"
            checked={interest === 'Yes, please!'}
            onChange={() => setInterest('Yes, please!')}
          />
          Yes, please!
        </RadioLabel>
        <RadioLabel>
          <RadioInput
            type="radio"
            name="interest"
            value="No thanks"
            checked={interest === 'No thanks'}
            onChange={() => setInterest('No thanks')}
          />
          No thanks
        </RadioLabel>
      </RadioGroup>
      <EmailInput
        type="email"
        placeholder="name@email.com"
        visible={interest === 'Yes, please!'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Description>Your email will be only used for research outreach and will never be shared.</Description>
      <TermsLabel visible={interest === 'Yes, please!'}>
        <TermsCheckbox type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
        By checking this box you hereby agree that you have read and agree to our Terms of Use and Privacy Policy
      </TermsLabel>
    </>
  );
};

export default FollowUpComponent;
