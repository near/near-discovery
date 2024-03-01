import styled from 'styled-components';
import EneryLabel from './EnergyLabel';
import ClaimButton from './ClaimButton';
import useClaim from '../../hooks/useClaim';
import { StyledCoin } from '@/views/Quest/styles';

const StyledContainer = styled.div`
  position: relative;
  height: 137px;
  padding-top: 20px;
  box-sizing: border-box;
  top: 0px;
  left: -1px;
`;

const StyledContent = styled.div`
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 115px;
  padding-left: 28px;
  padding-right: 47px;
`;

const StyledBg = styled.div`
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;

const StyledCenterPanel = styled.div`
  text-align: center;
`;
const StyledCenterDesc = styled.div`
  color: #000;
  font-family: Trans-America;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 16px */
  margin-top: 11px;
  text-align: center;
`;
const StyledCenterImg = styled.img`
  width: 145.6px;
  height: 56px;
  flex-shrink: 0;
`;
const StyledRightPanel = styled.div``;
const StyledRightAmountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: -26px;
  margin-top: 20px;
`;
const StyledRightAmount = styled.div`
  color: #000;
  text-align: right;
  font-family: Trans-America;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  margin-right: 16px;
`;
const StyledRightLabel = styled.div`
  color: #000;
  text-align: center;
  font-family: Trans-America;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  margin-left: 9px;
`;

export default function Footer({ availableSpins, unclaimedReward, onSuccess }: any) {
  const { loading: claiming, onClaim } = useClaim(onSuccess);
  return (
    <StyledContainer>
      <StyledBg>
        <svg width="1201" height="137" viewBox="0 0 1201 137" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 22H1201V125C1201 131.627 1195.63 137 1189 137H12C5.37255 137 0 131.627 0 125V22Z"
            fill="#33C5F4"
          />
          <path
            d="M795 96H1201V12C1201 5.37258 1195.63 -1.78814e-06 1189 -1.78814e-06H888.302C882.545 -1.78814e-06 877.067 2.48098 873.27 6.80827L795 96Z"
            fill="#33C5F4"
          />
        </svg>
      </StyledBg>
      <StyledContent>
        <EneryLabel amount={availableSpins || 0} />
        <StyledCenterPanel>
          <StyledCenterImg src="/images/odyssey/v2/game_footer_center.png" />
          <StyledCenterDesc>{"Venture into Linea's Expansive DeFi Ecosystem".toUpperCase()}</StyledCenterDesc>
        </StyledCenterPanel>
        <StyledRightPanel>
          <StyledRightAmountWrapper>
            <StyledRightAmount>{unclaimedReward || 0}</StyledRightAmount>
            <StyledCoin $size={27} />
            <StyledRightLabel>PTS</StyledRightLabel>
          </StyledRightAmountWrapper>
          <ClaimButton
            disabled={!unclaimedReward || claiming}
            onClick={() => {
              if (!unclaimedReward) return;
              onClaim();
            }}
          />
        </StyledRightPanel>
      </StyledContent>
    </StyledContainer>
  );
}
