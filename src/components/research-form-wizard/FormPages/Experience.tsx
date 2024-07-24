import { useResearchWizardStore } from '@/stores/researchWizard';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0;
`;

const SubTitle = styled.p`
  margin: 0 0 10px 0;
  font-weight: 500;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
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
    border-color: #aa99ec;
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

export const ExperienceComponent = () => {
  const set = useResearchWizardStore((state) => state.set);
  const [devExperience, setDevExperience] = useState('');
  const [web3Experience, setWeb3Experience] = useState('');
  useEffect(() => {
    const isDisabled = devExperience.length > 1;

    set({
      nextDisabled: !isDisabled,
      currentStepSubmission: { response_developer_experience: devExperience, response_web3_experience: web3Experience },
    });
  }, [devExperience, set]);

  return (
    <ExperienceContainer>
      <SubTitle>How many years of development experience do you have?</SubTitle>
      <RadioGroup>
        {['1 year or less', '1 - 2 years', '2 - 4 years', '5 years or more'].map((option) => (
          <RadioLabel key={option}>
            <RadioInput
              type="radio"
              name="devExperience"
              value={option}
              checked={devExperience === option}
              onChange={() => setDevExperience(option)}
            />
            {option}
          </RadioLabel>
        ))}
      </RadioGroup>

      <SubTitle>How many years of Web3 experience do you have?</SubTitle>
      <RadioGroup>
        {['1 year or less', '1 - 2 years', '2 - 4 years', '5 years or more'].map((option) => (
          <RadioLabel key={option}>
            <RadioInput
              type="radio"
              name="web3Experience"
              value={option}
              checked={web3Experience === option}
              onChange={() => setWeb3Experience(option)}
            />
            {option}
          </RadioLabel>
        ))}
      </RadioGroup>
    </ExperienceContainer>
  );
};
