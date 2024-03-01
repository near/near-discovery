import styled from 'styled-components';
import { motion } from 'framer-motion';
import { overlay } from '@/components/animation';

export const StyledContainer = styled(motion.div)`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 1180px;
  height: 728px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledStartButtonWrapper = styled.div`
  background-image: url(/images/odyssey/v2/start_bg.png);
  background-repeat: no-repeat;
  width: 185px;
  height: 111.464px;
  background-size: cover;
`;

const StyledButtonInner = styled(motion.div)`
  cursor: pointer;
  transform-origin: center;
  position: relative;
  width: 157.792px;
  height: 88.076px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.1s;
  top: 12px;
  left: 14px;
  &:active {
    transform: scale(0.96);
  }
`;

const StyledStartButtonBg = styled.div`
  position: absolute;
  z-index: 1;
`;

const StyledStartButtonText = styled.div`
  position: relative;
  z-index: 2;
  color: #000;
  font-family: Trans-America;
  font-size: 26px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 36px */
`;

export default function Start({ onStart, starting }: any) {
  // onClick={onStart}
  return (
    <StyledContainer {...overlay}>
      <StyledStartButtonWrapper>
        <StyledButtonInner>
          <StyledStartButtonText>START</StyledStartButtonText>
          <StyledStartButtonBg>
            <svg xmlns="http://www.w3.org/2000/svg" width="198" height="129" viewBox="0 0 198 129" fill="none">
              <g filter="url(#filter0_di_6986_4417)">
                <path
                  d="M160.497 20.6108H37.2949L20 36.7767V91.406L37.2949 108.687H160.497L177.792 93.0783V36.7767L160.497 20.6108Z"
                  fill="#33C5F4"
                />
              </g>
              <defs>
                <filter
                  id="filter0_di_6986_4417"
                  x="0"
                  y="0.61084"
                  width="197.792"
                  height="128.076"
                  filterUnits="userSpaceOnUse"
                  colorInterpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6986_4417" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6986_4417" result="shape" />
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
                  <feBlend mode="normal" in2="shape" result="effect2_innerShadow_6986_4417" />
                </filter>
              </defs>
            </svg>
          </StyledStartButtonBg>
        </StyledButtonInner>
      </StyledStartButtonWrapper>
    </StyledContainer>
  );
}
