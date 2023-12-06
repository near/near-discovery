import styled from 'styled-components';

export { StyledTitle } from '../Quests/styles';
export { LoadingWrapper, Empty } from '../../styles';

export const StyledContainer = styled.div`
  padding-top: 50px;
`;

export const StyledDapps = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 58px;
`;

export const StyledDapp = styled.div`
  display: flex;
  padding-bottom: 30px;
  border-bottom: 1px solid #26282f;
  width: 375px;
  margin-top: 30px;
`;

export const StyledDappIcon = styled.div`
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 16px;
  margin-right: 16px;
`;

export const StyledDappInfo = styled.div`
  margin-right: 6px;
  width: 205px;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const StyledDappTitle = styled.div`
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const StyledDappCoins = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: #ffdd4d;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const StyledDappDesc = styled.div`
  color: #979abe;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-top: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledDappTags = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 9px;
`;

export const StyledDappTag = styled.div`
  border-radius: 30px;
  border: 1px solid #acfced;
  padding: 0px 8px;
  height: 20px;
  line-height: 18px;
  font-size: 12px;
  font-weight: 400;

  &.dexs {
    color: #acfced;
  }
  &.bridge {
    color: #e3e99d;
  }
  &.liquidity {
    color: #aad6ff;
  }
`;

export const StyledDappButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const StyledDappButton = styled.button`
  border-radius: 16px;
  border: 1px solid #373a53;
  background: rgba(55, 58, 83, 0.5);
  width: 78px;
  height: 26px;
  flex-shrink: 0;
  color: #fff;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;
