import styled from 'styled-components';

const StyledSpinner = styled.div`
  position: fixed;
  z-index: 8001;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.6);
`;
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const SpinnerImg = styled.img`
  width: 50px;
`;

export default function Spinner() {
  return (
    <StyledSpinner>
      <SpinnerContainer>
        <SpinnerImg src="https://ipfs.near.social/ipfs/bafkreigxis5i2vafexhyfbafhwfvkebnk7epluyshqrzvkkbixrkkinudu" />
      </SpinnerContainer>
    </StyledSpinner>
  );
}
