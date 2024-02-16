import styled from 'styled-components';

export const StyledContainer = styled.div`
  margin-top: 120px;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;
  color: #fff;
  font-family: Montserrat;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const StyledTitleImg = styled.img`
  width: 28px;
  height: 33px;
  flex-shrink: 0;
`;

export const StyledList = styled.div`
  display: flex;
  align-items: center;
  gap: 12px 12px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

export const StyledItem = styled.div`
  width: 302px;
  height: 142px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #21232a;
  box-sizing: border-box;
  padding: 20px;
  transition: 0.5s;
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

  &:hover {
    background: #292c34;
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
