import { memo, useState, useEffect } from 'react';
import styled from 'styled-components';

import CopyButton from '@/components/CopyButton';
import useAccount from '@/hooks/useAccount';
import { useUserStore } from '@/stores/user';
import { ellipsAccount } from '@/utils/account';

const StyledItem = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;
const Logo = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-image: conic-gradient(from 180deg at 50% 50%, #00d1ff 0deg, #ff008a 360deg);
`;
const LogoImage = styled.img<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
`;
const Account = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Address = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AccountItem = ({ showCopy = true, logoSize = 38 }: { showCopy?: boolean; logoSize?: number }) => {
  const { account } = useAccount();
  const userInfo = useUserStore((store: any) => store.user);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return ready ? (
    <StyledItem>
      {userInfo?.avatar ? <LogoImage src={userInfo.avatar} size={logoSize} /> : <Logo size={logoSize} />}
      <div>
        <Account>
          {userInfo?.username ? (
            userInfo?.username
          ) : (
            <>
              {ellipsAccount(account)}
              {account && showCopy && (
                <CopyButton
                  size={16}
                  text={account}
                  tooltipMessage="Copied"
                  tooltipTop={-31}
                  tooltipRight={-12}
                  tooltipFontSize={12}
                />
              )}
            </>
          )}{' '}
        </Account>
        {userInfo?.username && (
          <Address>
            <span>{ellipsAccount(account)} </span>
            {account && showCopy && (
              <CopyButton
                size={16}
                text={account}
                tooltipMessage="Copied"
                tooltipTop={-31}
                tooltipRight={-12}
                tooltipFontSize={12}
              />
            )}
          </Address>
        )}
      </div>
    </StyledItem>
  ) : (
    <div />
  );
};

export default memo(AccountItem);
