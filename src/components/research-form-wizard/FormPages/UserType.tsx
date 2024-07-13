import { useResearchWizardStore } from '@/stores/researchWizard';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const UserTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.h5`
  margin: 0 0 10px 0;
`;

const Text = styled.p`
  margin: 0;
  margin-bottom: 1rem;
  color: #868682;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid lightgray;
  border-radius: 4px;
  position: relative;
  cursor: pointer;

  &:checked {
    border-color: #6e56cf;
    background-color: #aa99ec;
  }

  &:checked::before {
    content: '✓';
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 14px;
  }
`;
const OtherInput = styled.input<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  margin-top: 10px;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 100%;
`;

const UserTypeComponent = () => {
  const set = useResearchWizardStore((state) => state.set);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherInputEntry, setOtherInputEntry] = useState('');
  useEffect(() => {
    const isDisabled = selectedTypes.length > 0;

    set({
      nextDisabled: !isDisabled,
      currentStepSubmission: { selectedUserTypes: selectedTypes, other: otherInputEntry },
    });
  }, [selectedTypes, otherInputEntry, set]);

  const handleCheckboxClick = (type: string) => {
    if (type === 'Other') {
      setIsOtherSelected(!isOtherSelected);
      if (!isOtherSelected) {
        setSelectedTypes((prev) => [...prev, type]);
      } else {
        setSelectedTypes((prev) => prev.filter((item) => item !== type));
      }
    } else {
      setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]));
    }
  };

  return (
    <UserTypeContainer>
      <SubTitle>Which of the following describes you the best?</SubTitle>
      <Text>Select all that apply</Text>
      <CheckboxGroup>
        {[
          'Full-stack developer',
          'Front-end developer',
          'Back-end developer',
          'Smart contract developer',
          'Entrepreneur/Founder',
          'Other',
        ].map((type) => (
          <CheckboxLabel key={type}>
            <CheckboxInput
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => handleCheckboxClick(type)}
            />
            {type}
          </CheckboxLabel>
        ))}
      </CheckboxGroup>
      <OtherInput
        type="text"
        placeholder="I am..."
        visible={isOtherSelected}
        onChange={(e) => setOtherInputEntry(e.target.value)}
      />
    </UserTypeContainer>
  );
};

export default UserTypeComponent;
