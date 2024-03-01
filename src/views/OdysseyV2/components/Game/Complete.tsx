import { memo, useEffect } from 'react';
import styled from 'styled-components';
import { modal, overlay } from '@/components/animation';
import { motion } from 'framer-motion';
import { StyledContainer } from './Start';

const StyledBox = styled(motion.div)`
  background-image: url(/images/odyssey/v2/complete_bg.png);
  background-repeat: no-repeat;
  width: 723px;
  height: 670px;
  text-align: center;
  margin-top: -100px;
  margin-left: 18px;
`;

const StyledTitle = styled.div`
  color: #000;
  text-align: center;
  font-family: Trans-America;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 80px */
`;
const StyledAmount = styled(StyledTitle)`
  font-size: 80px;
  margin-top: 244px;
  margin-bottom: -10px;
`;

const StyledDesc = styled.div`
  color: #000;
  text-align: center;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 20px */
  margin-top: 11px;
  .amount {
    font-weight: 700;
  }
`;

const StyledPlayAgainButton = styled.div`
  background-image: url(/images/odyssey/v2/play_again.png);
  background-repeat: no-repeat;
  width: 224.371px;
  height: 89.376px;
  position: relative;
  cursor: pointer;
  margin-top: 12px;
  &:active {
    right: -2px;
    bottom: -2px;
  }
`;

const StyledButton = styled.button`
  display: block;
  color: #000;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 20px */
  text-decoration-line: underline;
  margin-top: 15px;
  background-color: transparent;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;

export const StyledInner = styled.div`
  margin-left: -60px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Complete = ({ amount, count, onClose, onPlayAgain }: any) => {
  useEffect(() => {
    document.body.addEventListener('click', onClose);

    return () => {
      document.body.removeEventListener('click', onClose);
    };
  }, []);
  return (
    <StyledContainer {...overlay} style={{ zIndex: 40 }}>
      <StyledBox
        {...modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <StyledInner>
          <StyledAmount>{amount}</StyledAmount>
          <StyledTitle>PTS EARNING</StyledTitle>
          <StyledDesc>
            You complete in <span className="amount">{count}</span> flips this round
          </StyledDesc>
          <StyledPlayAgainButton onClick={onPlayAgain} />
          <StyledButton onClick={onClose}>Close</StyledButton>
        </StyledInner>
      </StyledBox>
    </StyledContainer>
  );
};

export default memo(Complete);
