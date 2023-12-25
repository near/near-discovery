import { motion } from 'framer-motion';
import styled from 'styled-components';

export { StyledTitle, StyledCoin } from '../../styles';

export const StyledCampaipnsContainer = styled.div`
  height: 222px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 222px;
`;

export const StyledCampaipnContainer = styled.div`
  margin-top: 33px;
  border-radius: 32px;
  background: radial-gradient(100% 100% at 0% 0%, #ae92ff 0%, #6d2df3 100%);
  padding: 30px 30px 26px;
  height: 222px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StyledHeartBox = styled(motion.div)<{ $active?: boolean }>`
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
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

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
