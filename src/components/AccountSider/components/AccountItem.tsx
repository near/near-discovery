import { memo, useEffect, useState } from 'react';
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
const StyledLogo = styled.div`
  position: relative;
  
`
const StyledKol = styled.div`
  position: absolute;
  display: flex;
  /* left: 3px; */
  left: 50%;
  bottom: -6px;
  transform: translateX(-50%);
`
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

const AccountItem = ({
  showCopy = true,
  logoSize = 38,
  bp,
}: {
  bp?: string;
  showCopy?: boolean;
  logoSize?: number;
}) => {
  const { account } = useAccount();
  const userInfo = useUserStore((store: any) => store.user);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return ready ? (
    <StyledItem data-bp={bp}>
      <StyledLogo>
        {userInfo?.avatar ? <LogoImage src={userInfo.avatar} size={logoSize} /> : <Logo size={logoSize} />}
        {
          userInfo?.is_kol && (
            <StyledKol>
              <svg xmlns="http://www.w3.org/2000/svg" width="33" height="16" viewBox="0 0 33 16" fill="none">
                <path d="M29.2071 12.7599C32.2146 11.0937 33.3585 7.17552 31.8115 4.01137C30.2569 0.831619 26.546 -0.435659 23.5188 1.24147C22.3862 1.86891 19.8083 2.47829 16.4618 2.50045C13.1568 2.52232 10.4145 1.96393 9.1349 1.36006C6.01247 -0.113539 2.38643 1.40047 1.02348 4.67308C-0.333588 7.93156 1.0361 11.769 4.13971 13.2337C7.67117 14.9003 12.386 15.5266 16.5385 15.4991C20.6496 15.4719 25.5288 14.7978 29.2071 12.7599Z" fill="#EBF479" stroke="#262836" stroke-linecap="round" />
                <path d="M4.31805 10.2617C3.88882 9.83996 5.38075 5.7326 6.1022 3.79672C6.54187 2.61684 8.97646 3.62117 9.16721 3.83049C9.54949 4.24998 8.35115 5.1842 8.07411 6.55358C9.19489 5.71494 10.515 4.3863 10.9135 4.42952C11.4116 4.48354 13.3463 6.44048 12.8108 6.67046C12.3824 6.85444 10.5959 7.81763 9.01442 8.31823C10.3966 9.33232 12.679 10.3143 12.6399 10.8892C12.5828 11.7291 10.7903 12.4203 9.70694 12.2776C8.78917 12.1568 8.11254 10.2003 7.71186 9.30735C7.64957 9.78069 7.78144 11.3171 7.41003 11.6022C6.89077 12.0008 4.65639 11.2401 4.31805 10.2617Z" fill="black" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.894 13.1025C19.0503 13.1025 20.7983 11.2882 20.7983 9.05016C20.7983 6.8121 19.0503 4.9978 16.894 4.9978C14.7377 4.9978 12.9897 6.8121 12.9897 9.05016C12.9897 11.2882 14.7377 13.1025 16.894 13.1025ZM16.9849 10.5077C17.5365 10.5077 17.9837 9.83689 17.9837 9.00944C17.9837 8.18198 17.5365 7.51119 16.9849 7.51119C16.4332 7.51119 15.9861 8.18198 15.9861 9.00944C15.9861 9.83689 16.4332 10.5077 16.9849 10.5077Z" fill="black" />
                <path d="M28.605 10.6676C27.0368 11.3243 25.1613 11.5986 23.7953 11.7312C23.2945 11.7797 22.8458 11.441 22.775 10.948C22.5537 9.4079 22.1859 6.39849 21.6533 4.86534C21.3446 3.97568 24.4787 3.64757 25.0322 3.86165C25.5858 4.07574 24.6922 8.94764 25.0094 9.21113C25.2775 9.43385 28.0895 7.26661 28.7859 7.91156C29.028 8.13581 29.2255 10.4077 28.605 10.6676Z" fill="black" />
              </svg>
            </StyledKol>
          )
        }
      </StyledLogo>
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
