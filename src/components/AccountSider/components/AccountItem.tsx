import { memo } from 'react';
import styled from 'styled-components';
import CopyButton from '@/components/CopyButton';
import useAccount from '@/hooks/useAccount';
import { ellipsAccount } from '@/utils/account';

const StyledItem = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;
const Logo = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-image: conic-gradient(from 180deg at 50% 50%, #00d1ff 0deg, #ff008a 360deg);
`;
const Account = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
`;

const AccountSider = () => {
  const { account } = useAccount();
  return (
    <StyledItem>
      <Logo />
      <Account>{ellipsAccount(account)}</Account>
      {account && (
        <CopyButton
          size={16}
          text={account}
          tooltipMessage="Copied"
          tooltipTop={-31}
          tooltipRight={-12}
          tooltipFontSize={12}
        />
      )}
    </StyledItem>
  );
};

export default memo(AccountSider);
