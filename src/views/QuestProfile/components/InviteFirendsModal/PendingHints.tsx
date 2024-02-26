import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 181px;
  height: 69px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #373a53;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  padding: 6px 14px;
  box-sizing: border-box;
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  left: 100%;
  top: -70%;
  opacity: 0;
  transition: 0.3s;
`;

export default function PendingHints() {
  return (
    <StyledContainer className="hints">
      This user hasn&apos;t generated any on-chain actions by DapDap yet.
    </StyledContainer>
  );
}
