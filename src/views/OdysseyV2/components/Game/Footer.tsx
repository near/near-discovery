import styled from 'styled-components';
import EneryLabel from './EnergyLabel';
import ClaimButton from './ClaimButton';
import useClaim from '../../hooks/useClaim';
import { StyledCoin } from '@/views/Quest/styles';

const StyledContainer = styled.div`
  position: relative;
  height: 162px;
  padding-top: 47px;
  box-sizing: border-box;
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
`;

const StyledCenterPanel = styled.div`
  text-align: center;
`;
const StyledCenterDesc = styled.div`
  color: #000;
  font-family: Trans-America;
  font-size: 16px;
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
  font-size: 60px;
  font-style: normal;
  font-weight: 400;
  margin-right: 16px;
`;
const StyledRightLabel = styled.div`
  color: #000;
  text-align: center;
  font-family: Trans-America;
  font-size: 26px;
  font-style: normal;
  font-weight: 400;
  margin-left: 9px;
`;

export default function Footer({ availableSpins, unclaimedReward, onSuccess }: any) {
  const { loading: claiming, onClaim } = useClaim(onSuccess);
  return (
    <StyledContainer>
      <StyledBg>
        <svg width="1260" height="162" viewBox="0 0 1260 162" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 47H1260V150C1260 156.627 1254.63 162 1248 162H12C5.37258 162 0 156.627 0 150V47Z"
            fill="#33C5F4"
          />
          <path
            d="M686.5 126H1260V12C1260 5.37258 1254.63 0 1248 0H814.121C808.618 0 803.359 2.26709 799.581 6.26753L686.5 126Z"
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
