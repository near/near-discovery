import styled from 'styled-components';

export const StyledDapps = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 30px;
  margin-top: 30px;
`;

export const StyledDapp = styled.div`
  padding: 16px 14px 0px;
  border-radius: 20px;
  transition: 0.5s;
  box-sizing: border-box;
  width: calc(33.333333333% - 20px);
  &:hover {
    background: #21232a;
  }

  @media (max-width: 1640px) {
    width: calc(50% - 16px);
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const StyledDappIcon = styled.img`
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 16px;
  margin-right: 16px;
`;

export const StyledDappInfo = styled.div`
  margin-right: 6px;
  width: calc(100% - 172px);
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
  flex-shrink: 0;
`;

export const StyledDappButton = styled.button`
  border-radius: 16px;
  border: 1px solid #373a53;
  background: rgba(55, 58, 83, 0.5);
  width: 78px;
  height: 26px;
  flex-shrink: 0;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  &:hover {
    background: #ebf479;
    color: #000;
  }
  &:active {
    opacity: 0.8;
  }
`;

export const StyledDappInner = styled.div`
  display: flex;
  border-bottom: 1px solid #26282f;
  padding-bottom: 33px;
  height: 100%;
  box-sizing: border-box;
`;
