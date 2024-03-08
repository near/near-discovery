import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1188px;
  margin: 118px auto 0px;
`;

const StyledRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StyledLabel = styled.div`
  color: #979abe;
  text-align: right;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
`;

const StyledValue = styled.div`
  font-family: Trans-America;
  font-size: 46px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 46px */
  background: linear-gradient(180deg, #fff 39.2%, #33c5f4 80%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledTextWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;
  height: 74px;
  padding-left: 30px;
`;

const StyledText = styled.div`
  color: #000;
  text-align: center;
  font-family: Trans-America;
  font-size: 60px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;

  &.small {
    font-size: 26px;
    margin-left: 60px;
    margin-bottom: 9px;
  }
`;

export default function FilpEarningTitle({ collect }: any) {
  return (
    <StyledContainer>
      <StyledTextWrapper>
        <StyledText>ENERGY</StyledText>
        <StyledText className="small">TASKS</StyledText>
      </StyledTextWrapper>
      <svg width="553" height="87" viewBox="0 0 752 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 4C0 1.79086 1.79086 0 4 0H496.603C498.079 0 499.434 0.812304 500.13 2.11339L509.37 19.3866C510.066 20.6877 511.421 21.5 512.897 21.5H725.022C726.789 21.5 728.347 22.6598 728.854 24.3528L749.959 94.8529C750.727 97.4188 748.806 100 746.127 100H4.00001C1.79087 100 0 98.2091 0 96V4Z"
          fill="url(#paint0_linear_1_5)"
        />
        <path
          d="M456 26.5L465 31.5M465 31.5L475 30.5M465 31.5L467 22M465 31.5L457 38.5M465 31.5L470 41"
          stroke="black"
          strokeWidth="5"
        />
        <defs>
          <linearGradient id="paint0_linear_1_5" x1="253" y1="20" x2="253" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0.32" stopColor="white" />
            <stop offset="1" stopColor="#33C5F4" />
          </linearGradient>
        </defs>
      </svg>

      <StyledRight>
        <StyledLabel>Collected</StyledLabel>
        <StyledValue>{collect}</StyledValue>
      </StyledRight>
    </StyledContainer>
  );
}
