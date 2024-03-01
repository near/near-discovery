import styled from 'styled-components';

export const StyledContainer = styled.div`
  background-image: url(/images/odyssey/v2/banner_bg.webp);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center center;
  height: 588px;
  margin-top: -12px;
`;

export const StyledContent = styled.div`
  height: 492px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledTitle = styled.div`
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 60px;
  font-style: italic;
  font-weight: 700;
  line-height: 100%;
  text-transform: capitalize;
  margin: 36px 0px;
`;

export const StyledDesc = styled.div`
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 20px;
  font-style: italic;
  font-weight: 400;
  line-height: 100%; /* 20px */
  margin-top: 30px;
`;
