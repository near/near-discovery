import styled from 'styled-components';
import { motion } from 'framer-motion';
import { overlay } from '@/components/animation';

export const StyledContainer = styled(motion.div)`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 1258px;
  height: 813px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledStartButtonWrapper = styled.div`
  background-image: url(/images/odyssey/v2/start_bg.png);
  background-repeat: no-repeat;
  width: 239px;
  height: 144px;
`;

const StyledButtonInner = styled(motion.div)`
  cursor: pointer;
  transform-origin: center;
  position: relative;
  width: 244px;
  height: 154px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.1s;
  &:active {
    transform: scale(0.96);
  }
`;

const StyledStartButtonBg = styled.div`
  position: absolute;
  z-index: 1;
  top: -5px;
  left: -2px;
`;

const StyledStartButtonText = styled.div`
  position: relative;
  z-index: 2;
  color: #000;
  font-family: Trans-America;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 36px */
`;

export default function Start({ onStart, starting }: any) {
  return (
    <StyledContainer {...overlay}>
      <StyledStartButtonWrapper>
        <StyledButtonInner onClick={onStart}>
          <StyledStartButtonText>START</StyledStartButtonText>
          <StyledStartButtonBg>
            <svg xmlns="http://www.w3.org/2000/svg" width="244" height="154" viewBox="0 0 244 154" fill="none">
              <g filter="url(#filter0_di_6849_10903)">
                <path
                  d="M201.506 20H42.3431L20 40.8845V111.46L42.3431 133.784H201.506L223.85 113.62V40.8845L201.506 20Z"
                  fill="#33C5F4"
                />
              </g>
              <defs>
                <filter
                  id="filter0_di_6849_10903"
                  x="0"
                  y="0"
                  width="243.85"
                  height="153.785"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="10" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.2 0 0 0 0 0.772549 0 0 0 0 0.956863 0 0 0 0.8 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6849_10903" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6849_10903" result="shape" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="10" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
                  <feBlend mode="normal" in2="shape" result="effect2_innerShadow_6849_10903" />
                </filter>
              </defs>
            </svg>
          </StyledStartButtonBg>
        </StyledButtonInner>
      </StyledStartButtonWrapper>
    </StyledContainer>
  );
}
