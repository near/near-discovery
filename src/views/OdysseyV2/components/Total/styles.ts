import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: -96px;
`;

export const StyledCard = styled.div`
  border-radius: 20px;
  border: 1px solid #464b56;
  font-family: Montserrat;
  background: #252831;
  width: 344px;
  height: 157px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
`;

export const StyledCardLabel = styled.div`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
`;

export const StyledCardValue = styled.div`
  color: #fff;
  text-align: center;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 45px */
  text-transform: capitalize;
`;
