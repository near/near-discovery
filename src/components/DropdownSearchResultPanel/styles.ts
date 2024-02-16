import styled from 'styled-components';

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px;
  padding-left: 30px;
`;

export const StyledSearchResults = styled.div`
  width: 100%;
  position: absolute;
  top: 55px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: rgb(48, 49, 66);
  color: rgba(151, 154, 190, 1);

  border-radius: 12px;
  max-height: 600px;
  overflow: auto;
  height: 0;

  &.show {
    border: 1px solid rgba(55, 58, 83, 1);
    padding: 20px 0px;
    animation: slideDown 0.5s ease forwards;
  }
  &.hide {
    border: 1px solid rgba(55, 58, 83, 1);
    padding: 20px 0px;
    animation: slideUp 0.5s ease forwards;
  }
  @keyframes slideDown {
    0% {
      opacity: 0;
      transform: translateY(-10px);
      height: 0;
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      height: auto;
    }
  }
  @keyframes slideUp {
    0% {
      opacity: 1;
      transform: translateY(0);
      height: auto;
    }
    100% {
      opacity: 0;
      transform: translateY(-10px);
      height: 0;
    }
  }
`;

export const StyledResultItemContainer = styled.div`
  .result-item-link {
    text-decoration: none;
  }
`;

export const StyledResultTitle = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 30px;
`;

export const StyledResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 30px;
  cursor: pointer;
  transition: 0.3s;
  &: hover {
    background-color: rgba(24, 26, 39, 0.3);
  }
`;

export const StyledResultItemImg = styled.img`
  width: 30px;
  height: 30px;
`;

export const StyledResultItemTitle = styled.div`
  font-size: 14px;
  color: #ffffff;
  margin-top: 6px;
  margin-left: 10px;
`;

export const StyledMore = styled.div`
  cursor: pointer;
`;
