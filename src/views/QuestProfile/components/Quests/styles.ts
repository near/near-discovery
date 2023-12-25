import styled from 'styled-components';
import { motion } from 'framer-motion';
export { LoadingWrapper, Empty } from '../../styles';

export const StyledContainer = styled.div`
  padding-top: 40px;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  text-transform: capitalize;
`;

export const StyledLabels = styled.div`
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: #1c1d29;
  width: 292px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 4px;
  box-sizing: border-box;
`;

export const StyledLabel = styled(motion.div)<{ $active: boolean }>`
  height: 32px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 32px;
  text-align: center;
  flex-grow: 1;
  border-radius: 8px;
  cursor: pointer;

  ${({ $active }) => $active && `background: #2C2E3E`}
`;

export const StyledQuests = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;
