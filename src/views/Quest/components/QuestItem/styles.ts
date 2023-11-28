import styled from 'styled-components';

export { StyledCoin } from '../../styles';

export const StyledContainer = styled.div`
  border-radius: 20px;
  border: 1px solid #373a53;
  background: #2c2e3e;
  width: 300px;
  height: 214px;
  flex-shrink: 0;
  padding: 18px 14px 14px;
  box-sizing: border-box;
`;

export const StyledTask = styled.div`
  display: flex;
  gap: 14px;
`;

export const StyledIconBox = styled.div`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledIcon = styled.img`
  max-width: 100px;
  max-height: 100px;
`;

export const StyledTaskName = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
  text-transform: capitalize;
`;

export const StyledTaskDesc = styled.div`
  color: #979abe;
  font-size: 15px;
  font-weight: 400;
  line-height: 120%;
  margin-top: 10px;
`;

export const StyledProcessBars = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 40px;
`;

export const StyledTags = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
  margin-top: 14px;
`;

export const StyledTag = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.3);
  height: 26px;
  flex-shrink: 0;
  padding: 0px 10px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;
