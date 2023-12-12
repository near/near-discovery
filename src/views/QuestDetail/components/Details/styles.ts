import { motion } from 'framer-motion';
import styled from 'styled-components';

export { StyledTitle } from '../../styles';
export { JoinedAccountsBox, JoinedAccounts, JoinedAccountsAmount } from '@/views/Quest/components/Campaign/styles';
export { StyledCoin } from '@/views/Quest/styles';

export const StyledContainer = styled.div`
  width: 480px;
`;

export const StyledType = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 120%;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export const StyledHeartBox = styled(motion.div)<{ $active?: boolean }>`
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.3);
  width: 36px;
  height: 26px;
  flex-shrink: 0;
  text-align: center;
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
  margin-top: 12px;
`;

export const StyledIconBox = styled.div`
  width: 200px;
  height: 200px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledIcon = styled.img`
  max-width: 200px;
  max-height: 200px;
`;

export const StyledRewardBox = styled.div`
  border-radius: 16px;
  border: 1px solid #373a53;
  background: rgba(55, 58, 83, 0.2);
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ebf479;
  font-size: 14px;
  font-weight: 700;
  height: 48px;
  box-sizing: border-box;
  margin-top: 14px;
`;

export const StyledTimeBox = styled.div`
  border-radius: 16px;
  border: 1px solid #373a53;
  background: rgba(55, 58, 83, 0.2);
  padding: 14px 20px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  height: 48px;
  box-sizing: border-box;
  margin-top: 14px;
`;

export const StyledLabel = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

export const StyledRewardsAndTimeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
`;

export const StyledQuestInfo = styled.div`
  margin-top: 40px;
`;

export const StyledQuestInfoItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const StyledQuestInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledQuestInfoIcon = styled.div`
  border-radius: 10px;
  border: 1px solid #373a53;
  background: rgba(55, 58, 83, 0.2);
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledQuestInfoLabel = styled.div`
  color: #979abe;
  font-size: 14px;
  font-weight: 400;
`;

export const StyledQuestInfoValue = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  margin-top: 4px;
`;

export const StyledParticipants = styled.div`
  margin-top: 40px;
`;
