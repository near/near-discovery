import { useResearchWizardStore } from '@/stores/researchWizard';
import { isValidEmail } from '@/utils/form-validation';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
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

const EmailInput = styled.input<{ $visible: boolean }>`
  display: ${(props) => (props.$visible ? 'block' : 'none')};
  margin: 10px 0;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 100%;
`;

const TermsLabel = styled.label<{ $visible: boolean }>`
  display: ${(props) => (props.$visible ? 'flex' : 'none')};
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

const Link = styled.a`
  color: inherit;
  text-decoration: underline;
  &:hover {
    color: blue;
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
      currentStepSubmission: {
        response_opt_in: interest,
        response_email_address: email,
        response_agreed_to_terms: agreed,
      },
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
        $visible={interest === 'Yes, please!'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Description>Your email will be only used for research outreach and will never be shared.</Description>
      <TermsLabel $visible={interest === 'Yes, please!'}>
        <TermsCheckbox type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
        <span>
          By checking this box you hereby agree that you have read and agree to our{' '}
          <Link href="https://dev.near.org/terms" target="_blank">
            Terms of Use
          </Link>{' '}
          and{' '}
          <Link href="https://dev.near.org/privacy" target="_blank">
            Privacy Policy
          </Link>
        </span>
      </TermsLabel>
    </>
  );
};

export default FollowUpComponent;
