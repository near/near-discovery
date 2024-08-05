import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useResearchWizardStore } from '@/stores/researchWizard';

const InterestsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.h4`
  margin: 0 0 8px 0;
`;

const Text = styled.p`
  margin: 0;
  margin-bottom: 0.5rem;
  color: #868682;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const InterestButton = styled.button<{ $selected?: boolean }>`
  background: ${(props) => (props.$selected ? '#F5F2FF' : 'white')};
  border: 1px solid ${(props) => (props.$selected ? '#5746AF' : 'lightgray')};
  color: #1b1b18;
  border-radius: 20px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background 0.3s, border-color 0.3s, color 0.3s;

  &:hover {
    background: #e3e3e0;
  }
`;

const OtherInput = styled.input<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  margin-top: 10px;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 6px;
  width: 100%;
`;

const OtherLabel = styled.label<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  margin-top: 20px;
  font-size: 14px;
  font-weight: 700;
  color: #000;
`;

const Title = styled.h3`
  margin: 0;
`;

const InterestOptions = [
  'Docs',
  'Starting a new project',
  'Smart contracts',
  'Chain abstraction',
  'Evaluating tech',
  'Hackathon',
  'AI',
  'Add web3 into my app',
  'Meme coins',
  'Other',
];
export const Motivation = () => {
  const set = useResearchWizardStore((state) => state.set);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherInputEntry, setOtherInputEntry] = useState('');
  const otherInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isDisabled = selectedInterests.length > 0;

    set({
      nextDisabled: !isDisabled,
      currentStepSubmission: { response_interests: selectedInterests.join(), other: otherInputEntry },
    });
  }, [selectedInterests, otherInputEntry, set]);

  useEffect(() => {
    if (showOtherInput && otherInputRef.current) {
      otherInputRef.current?.focus();
      otherInputRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showOtherInput]);

  const handleOtherSelected = (interest: string) => {
    if (interest === 'Other') {
      setShowOtherInput(!showOtherInput);
    }

    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest],
    );
  };

  return (
    <InterestsContainer>
      <Title>Hello there!</Title>
      <Text>
        Welcome to Near Developer Portal. Tell us a little about yourself and we may invite you for a paid user study.
      </Text>
      <SubTitle>What brings you here today?</SubTitle>
      <Text>Select all that apply</Text>
      <ButtonsContainer>
        {InterestOptions.map((interest) => (
          <InterestButton
            key={interest}
            onClick={() => handleOtherSelected(interest)}
            $selected={selectedInterests.includes(interest)}
          >
            {interest}
          </InterestButton>
        ))}
      </ButtonsContainer>
      <OtherLabel visible={showOtherInput}>Other</OtherLabel>
      <OtherInput
        id="other-input"
        type="text"
        placeholder="I'm here to..."
        visible={showOtherInput}
        value={otherInputEntry}
        onChange={(e) => setOtherInputEntry(e.target.value)}
        ref={otherInputRef}
      />
    </InterestsContainer>
  );
};
