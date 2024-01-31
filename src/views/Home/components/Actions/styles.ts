import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: relative;
  padding-top: 110px;
`;

export const StyledActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
`;

export const StyledActionContainer = styled.div<{ clickable: boolean }>`
  width: 374px;
  height: 200px;
  flex-shrink: 0;
  border-radius: 20px;
  padding: 46px 30px 0px;
  box-sizing: border-box;
  position: relative;
  opacity: 1;
  transition: 0.3s;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};

  &:hover {
    opacity: ${({ clickable }) => (clickable ? 0.95 : 1)};
  }
`;

export const StyledActionTitle = styled.div`
  color: #000;
  font-family: Montserrat;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const StyledActionDesc = styled.div`
  color: #000;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 9px;
`;

export const StyledActionIcon = styled.div`
  position: absolute;
`;
