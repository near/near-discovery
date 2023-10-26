import styled from 'styled-components';

const StyledSplit = styled.div<{ mt?: number }>`
  margin-left: var(--padding-x);
  margin-right: var(--padding-x);
  margin-top: ${({ mt }) => mt + 'px'};
  height: 1px;
  background-color: #343838;
`;

export default StyledSplit;
