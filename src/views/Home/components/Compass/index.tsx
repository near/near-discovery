import { memo } from 'react';
import CompassIcon from '@/components/Icons/Compass';
import WinPtsIcon from '@/components/Icons/WinPts';
import {
  StyledContainer,
  StyledContent,
  StyledInner,
  StyledRadialBg,
  StyledTitle,
  StyledCard,
  StyledCardImg,
  StyledCardRight,
  StyledCardChains,
  StyledCardTitle,
  StyledCardDesc,
  StyledCardButton,
  StyledRadialBg2,
  StyledCompassIcon,
  StyledWinPtsIcon,
} from './styles';

const Compass = () => {
  return (
    <StyledContainer>
      <StyledContent>
        <StyledRadialBg />
        <StyledRadialBg2 />
        <StyledCompassIcon>
          <CompassIcon />
        </StyledCompassIcon>
        <StyledWinPtsIcon>
          <WinPtsIcon num="300,000" />
        </StyledWinPtsIcon>
        <StyledInner>
          <StyledTitle>Compass</StyledTitle>
          <StyledCard>
            <StyledCardImg src="/images/home/compass_left.png" />
            <StyledCardRight>
              <StyledCardChains src="/images/home/compass_chains.png" />
              <StyledCardTitle>Unveiling Uncharted Realms of L2s</StyledCardTitle>
              <StyledCardDesc>
                Effortlessly sift through a curated selection of dApps and identify your favourites.
              </StyledCardDesc>
              <StyledCardButton>
                <div>Explore now</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
                  <path
                    d="M1 5.2C0.558172 5.2 0.2 5.55817 0.2 6C0.2 6.44183 0.558172 6.8 1 6.8L1 5.2ZM17.5657 6.56569C17.8781 6.25327 17.8781 5.74674 17.5657 5.43432L12.4745 0.343147C12.1621 0.0307274 11.6556 0.0307274 11.3431 0.343147C11.0307 0.655566 11.0307 1.1621 11.3431 1.47452L15.8686 6L11.3431 10.5255C11.0307 10.8379 11.0307 11.3444 11.3431 11.6569C11.6556 11.9693 12.1621 11.9693 12.4745 11.6569L17.5657 6.56569ZM1 6.8L17 6.8L17 5.2L1 5.2L1 6.8Z"
                    fill="black"
                  />
                </svg>
              </StyledCardButton>
            </StyledCardRight>
          </StyledCard>
        </StyledInner>
      </StyledContent>
    </StyledContainer>
  );
};

export default memo(Compass);
