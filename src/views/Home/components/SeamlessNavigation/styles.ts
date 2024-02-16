import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 152px;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 60px;
  font-style: normal;
  font-weight: 700;
  line-height: 165%; /* 99px */
  text-transform: capitalize;
`;

export const StyledSubtitle = styled.div`
  color: #979abe;
  text-align: center;
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 36px */
  text-align: center;
  width: 900px;
  margin-top: 10px;
`;

export const StyledImageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
  margin-top: 40px;
`;

export const StyledImage = styled.img`
  width: 703px;
  height: 435px;
  flex-shrink: 0;
`;

export const StyledChains = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  width: 446px;
  cursor: pointer;
`;

export const StyledChain = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: rgba(55, 58, 83, 0.5);
`;

export const StyledChainLogo = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;

export const StyledChainName = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
