import loginBg from '@/assets/images/login_bg.png';
import loginLogo from '@/assets/images/login_logo.png';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import { memo } from 'react';
import {
  StyledFlex,
  StyledImage,
  StyledInvitedUsers,
  StyledLoginConnectWalletButton
} from './styles';

const LoginView = () => {
  const { connect, connecting } = useAuth();
  return (
    <StyledFlex style={{ height: '100vh' }} $gap='82px'>
      <StyledImage>
        <Image src={loginBg} style={{ width: 824, height: 636 }} alt='loginBg' />
      </StyledImage>
      <StyledFlex $direction='column' >
        <StyledImage style={{ marginBottom: 89 }}>
          <Image style={{ width: 409 }} src={loginLogo} alt='loginLogo' />
        </StyledImage>
        <StyledLoginConnectWalletButton
          onClick={() => {
            connect();
          }}
          disabled={connecting}
        >Connect Wallet</StyledLoginConnectWalletButton>
        <StyledInvitedUsers>💡 Invited users only</StyledInvitedUsers>
      </StyledFlex>
    </StyledFlex>
  );
};

export default memo(LoginView);
