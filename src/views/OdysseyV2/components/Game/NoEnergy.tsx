import { memo } from 'react';
import styled from 'styled-components';
import { modal, overlay } from '@/components/animation';
import { motion } from 'framer-motion';
import { StyledContainer } from './Start';

const StyledBox = styled(motion.div)`
  background-image: url(/images/odyssey/v2/no_energy.png);
  background-repeat: no-repeat;
  width: 545.764px;
  height: 322.828px;
  text-align: center;
`;

const StyledTitle = styled.div`
  color: #000;
  text-align: center;
  font-family: Trans-America;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 36px */
  margin-top: 90px;
`;

const StyledDesc = styled.div`
  color: #000;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 143%; /* 28.6px */
  margin: 12px auto 0px;
  width: 377px;
`;

const StyledButton = styled.button`
  color: #000;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 20px */
  text-decoration-line: underline;
  margin-top: 23px;
  background-color: transparent;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;

const NoEnergy = ({ onClose }: any) => {
  return (
    <StyledContainer {...overlay} style={{ zIndex: 40 }}>
      <StyledBox {...modal}>
        <StyledTitle>NO ENERGY</StyledTitle>
        <StyledDesc>Oops! You don’t have energy. You can collect energy by doing quests below.</StyledDesc>
        <StyledButton onClick={onClose}>I see</StyledButton>
      </StyledBox>
    </StyledContainer>
  );
};

export default memo(NoEnergy);
