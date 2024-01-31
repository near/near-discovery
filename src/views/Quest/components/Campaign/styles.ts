import { motion } from 'framer-motion';
import styled from 'styled-components';

export { StyledTitle, StyledCoin } from '../../styles';

export const StyledCampaignsContainer = styled.div`
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 222px;
`;

export const StyledCampaignContainer = styled.div`
  background: radial-gradient(100% 100% at 0% 0%, #AE92FF 0%, #6D2DF3 100%);
  height: 254px;
`;

export const StyledCampaign = styled.div`
  padding: 30px 30px 20px;
  width: 1244px;
  max-width: 100%;
  margin: 0 auto;
  padding-bottom: 100px;
  --onboarding-color: #787dff;
  --social-color: #aad6ff;
  --engage-color: #f4ca79;
`

export const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const StyledHeartBox = styled(motion.div) <{ $active?: boolean }>`
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.3);
  width: 41px;
  height: 30px;
  text-align: center;
  padding-top: 2px;
  cursor: pointer;

  ${({ $active }) =>
    $active &&
    `
  border: 1px solid rgba(255, 107, 142, 0.30);
  background: rgba(255, 107, 142, 0.15);`}
`;

export const StyledDesc = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  margin-top: 16px;
`;

export const StyledTags = styled.div`
  margin-top: 18px;
`;
export const StyledWrapper = styled.div`
`

export const StyledTag = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.3);
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0px 12px;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
`;

export const JoinedAccountsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  align-self: flex-end;
`;
export const JoinedAccounts = styled.div`
  display: flex;
  align-items: center;
  gap: -6px;
`;

export const JoinedAccountsAmount = styled.div`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledTimerBox = styled.div`
  display: flex;
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  gap: 20px;
`;
