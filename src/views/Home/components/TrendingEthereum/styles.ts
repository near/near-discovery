import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 1244px;
  margin: 120px auto 0px;
  overflow: hidden;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 165%; /* 59.4px */
  text-transform: capitalize;
`;

export const StyledChians = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 16px;
  margin-top: 30px;
`;

export const StyledChain = styled.div`
  padding: 25px 16px;
  width: 298px;
  height: 250px;
  flex-shrink: 0;
  border-radius: 20px;
  background: rgba(33, 35, 42, 0.9);
  backdrop-filter: blur(10px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledChainIcon = styled.img`
  width: 72px;
  height: 72px;
  flex-shrink: 0;
`;

export const StyledChainTitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 16px;
`;

export const StyledChainDesc = styled.div`
  color: #979abe;
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  margin-top: 22px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
`;
