import styled from 'styled-components';

export { StyledCell } from '../Table/styles';

export const StyledContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  border-radius: 32px;
  border: 1px solid #32353f;
  background: #21232a;
  padding: 40px 0px;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  text-transform: capitalize;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 22px 0px 49px;
`;

export const StyledUpdateButton = styled.div`
  border-radius: 32px;
  border: 1px solid #373a53;
  width: 210px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #979abe;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;

export const StyledCurrentRow = styled.div`
  padding-left: 21px;
  padding-right: 41px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: rgba(55, 58, 83, 0.2);
  height: 50px;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  margin: 27px 40px 0px;
`;

export const StyledRefreshIcon = styled.span`
  &.loading {
    animation: loading 1s linear infinite;
    @keyframes loading {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
