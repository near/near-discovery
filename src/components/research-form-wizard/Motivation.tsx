import { Button } from '@/components/lib/Button';
import styled from 'styled-components';

const InterestsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.p`
  margin: 0 0 10px 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const InterestButton = styled.button`
  background: white;
  border: 1px solid lightgray;
  border-radius: 20px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: lightgray;
  }
`;

const Title = styled.h2`
  margin: 0;
`;
export const Motivation = () => {
  return (
    <InterestsContainer>
      <Header>
        <Title>Hello there!</Title>
      </Header>
      <SubTitle>What brings you here today?</SubTitle>
      <ButtonsContainer>
        <InterestButton>Docs</InterestButton>
        <InterestButton>Starting a new project</InterestButton>
        <InterestButton>Smart contracts</InterestButton>
        <InterestButton>Chain abstraction</InterestButton>
        <InterestButton>Evaluating tech</InterestButton>
        <InterestButton>Hackathon</InterestButton>
        <InterestButton>AI</InterestButton>
        <InterestButton>Add web3 into my app</InterestButton>
        <InterestButton>Meme coins</InterestButton>
        <InterestButton>Other</InterestButton>
      </ButtonsContainer>
    </InterestsContainer>
  );
};
