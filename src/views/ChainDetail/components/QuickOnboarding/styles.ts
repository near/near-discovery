import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding-top: 80px;
  width: 1244px;
  margin: 0 auto;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const StyledSubtitle = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 161.2%; /* 25.792px */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledMore = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  color: #ebf479;
  text-align: right;
  font-family: Gantari;
  font-size: 16px;
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

export const StyledItem = styled.div`
  width: 310px;
  height: 142px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #292c34;
  box-sizing: border-box;
  padding: 20px;
  cursor: pointer;

  .item-title {
    color: #fff;
    font-family: Gantari;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 32px;
  }
`;

export const StyledItemBox = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const StyledLabel = styled.div`
  color: #979abe;
  text-align: right;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledValue = styled.div`
  color: #fff;
  text-align: right;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledItemImg = styled.img`
  width: 14px;
`;

export const StyledItemImgBox = styled.div`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledList = styled.div`
  display: flex;
  align-items: center;
  gap: 12px 12px;
  margin-top: 16px;
  flex-wrap: wrap;
`;
