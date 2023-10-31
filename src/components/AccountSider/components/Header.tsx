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

const Header = ({ showCodes, setShowCodes }: { showCodes: boolean; setShowCodes: (show: boolean) => void }) => {
  return (
    <StyledHeader>
      <AccountItem />
      <SubtractItem showCodes={showCodes} setShowCodes={setShowCodes} />
    </StyledHeader>
  );
};

export default memo(Header);
