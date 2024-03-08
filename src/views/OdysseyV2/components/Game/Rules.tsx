import { memo, useEffect } from 'react';
import styled from 'styled-components';
import { modal, overlay } from '@/components/animation';
import { motion } from 'framer-motion';
import { StyledContainer } from './Start';

const StyledBox = styled(motion.div)`
  background-image: url(/images/odyssey/v2/rules_bg.png);
  background-repeat: no-repeat;
  width: 851.764px;
  height: 673.828px;
  box-sizing: border-box;
  padding: 70px 65px 102px;
  position: relative;
  .bold {
    font-weight: 800;
  }
  z-index: 50;
`;

const StyledTitle = styled.div`
  color: #000;
  font-family: Trans-America;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 36px */
  text-align: center;
  margin-bottom: 41px;
`;

const StyledDesc = styled.div`
  color: #000;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 143%;
`;
const StyledNote = styled.div`
  color: #000;
  font-family: Montserrat;
  font-size: 20px;
  font-style: italic;
  font-weight: 600;
  line-height: 143%; /* 28.6px */
  margin-top: 17px;
`;
const StyledCloseButton = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 66px;
  height: 62px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;

const Rules = ({ onClose }: any) => {
  useEffect(() => {
    document.body.addEventListener('click', onClose);

    return () => {
      document.body.removeEventListener('click', onClose);
    };
  }, []);
  return (
    <StyledContainer {...overlay} style={{ zIndex: 50 }}>
      <StyledBox
        {...modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <StyledTitle>{'welcome to Linea odyssey'.toUpperCase()}</StyledTitle>
        <StyledDesc className="bold">How to Play:</StyledDesc>
        <StyledDesc>
          Click the &quot;Start&quot; button to flip two cards and reveal their icons. Match all pairs of cards by
          remembering their positions. Earn points based on your performance.Clicking &quot;Start&quot; consumes one
          energy. Complete the Quests on the activity page to get more game enenrgy.
        </StyledDesc>
        <StyledNote>Note: Exiting the page counts as the end of the game, and progress will not be saved.</StyledNote>
        <StyledDesc className="bold" style={{ marginTop: '29px' }}>
          Rewards:
        </StyledDesc>
        <StyledDesc>
          1. Complete the game in <span className="bold">25</span> flips to earn <span className="bold">1000</span> PTS.
        </StyledDesc>
        <StyledDesc>
          2. Complete the game in <span className="bold">30</span> flips to earn <span className="bold">500</span> PTS.
        </StyledDesc>
        <StyledDesc>
          3. Complete the game in <span className="bold">40</span> flips to earn <span className="bold">100</span> PTS.
        </StyledDesc>
        <StyledDesc>
          4. Complete the game in more than <span className="bold">40</span> flips to earn{' '}
          <span className="bold">50</span> PTS.
        </StyledDesc>
        <StyledCloseButton onClick={onClose}>
          <svg width="66" height="62" viewBox="0 0 66 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M66 0H0L66 62V0Z" fill="black" fillOpacity="0.6" />
            <path d="M65.5 60.8443L1.26253 0.5H65.5V60.8443Z" stroke="#33C5F4" strokeOpacity="0.5" />
            <path d="M55 10L39 26" stroke="#33C5F4" strokeWidth="2" />
            <path d="M39 10L55 26" stroke="#33C5F4" strokeWidth="2" />
          </svg>
        </StyledCloseButton>
      </StyledBox>
    </StyledContainer>
  );
};

export default memo(Rules);
