import styled from 'styled-components';

export { StyledLabel } from '../Details/styles';
export { StyledCoin } from '@/views/Quest/styles';

export const StyledContainer = styled.div``;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledItemContainer = styled.div`
  border-radius: 16px;
  border: 1px solid #373a53;
  background: rgba(55, 58, 83, 0.2);
  width: 700px;
  box-sizing: border-box;
  padding: 30px 24px 24px;
  margin-top: 20px;
  overflow: hidden;

  &:hover {
    border: 1px solid #ebf479;
  }
`;

export const StyledItemTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
`;

export const StyledItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const StyledIconBox = styled.div`
  cursor: pointer;
  transition: 0.5s;
  &.open {
    transform: rotate(90deg);
  }
`;

export const StyledButton = styled.button`
  border-radius: 12px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  width: 100%;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  gap: 6px;
  color: #1e2028;
  font-size: 18px;
  font-weight: 700;
  margin-top: 32px;
  transition: 0.3s;

  &:disabled {
    background: #7c7f96;
  }
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

export const StyledProcessBars = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 40px;
`;

export const StyledExpandContainer = styled.div`
  padding-left: 34px;
  display: none;
  // transition: height 0.4s ease-out, opacity 0.5s ease-in;
  &.open {
    display: block;
  }
`;

export const StyledExpand = styled.div`
  padding-top: 18px;
`;

export const StyledDesc = styled.div`
  color: #979abe;
  font-size: 16px;
  font-weight: 400;
`;

export const StyledDapps = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const StyledDapp = styled.div`
  border-radius: 12px;
  border: 1px solid #373a53;
  background: rgba(55, 58, 83, 0.2);
  height: 48px;
  padding: 0px 12px 0px 9px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  margin-top: 12px;
`;

export const StyledDappIcon = styled.img`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
`;

export const StyledMore = styled.div`
  cursor: pointer;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  margin-top: 24px;
`;

export const StyledExpandButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const StyledExpandButton = styled.div`
  border-radius: 8px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  width: 102px;
  height: 36px;
  flex-shrink: 0;
  color: #1e2028;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  line-height: 36px;
  margin-top: 20px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;
