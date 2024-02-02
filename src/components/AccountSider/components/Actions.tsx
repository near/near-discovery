import { memo } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div<{ mt?: number }>`
  display: flex;
  gap: 10px;
  margin-top: ${({ mt }) => mt + 'px'};
  padding-left: var(--padding-x);
  padding-right: var(--padding-x);
`;
const Button = styled.button<{ disabled?: boolean }>`
  border: none;
  flex-grow: 1;
  width: 50%;
  height: 46px;
  border-radius: 10px;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  background-color: #ebf479;

  &:disabled {
    color: #979abe;
    background-color: #373a53;
  }
`;

const Actions = ({ mt, onClick }: { mt?: number; onClick: (type: string) => void }) => {
  return (
    <StyledContainer mt={mt}>
      <Button
        onClick={() => {
          onClick('bridge');
        }}
        data-bp="30012-003"
      >
        Bridge
      </Button>
      {/* <Button disabled>Buy</Button> */}
    </StyledContainer>
  );
};

export default memo(Actions);
