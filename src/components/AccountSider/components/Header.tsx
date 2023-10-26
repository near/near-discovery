import { memo } from 'react';
import styled from 'styled-components';
import AccountItem from './AccountItem';
import SubtractItem from './SubtractItem';

const StyledHeader = styled.div`
  width: 100%;
  padding-left: var(--padding-x);
  padding-right: var(--padding-x);
  display: flex;
  justify-content: space-between;
`;

const Header = () => {
  return (
    <StyledHeader>
      <AccountItem />
      <SubtractItem />
    </StyledHeader>
  );
};

export default memo(Header);
