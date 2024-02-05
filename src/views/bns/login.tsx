import loginBg from '@/assets/images/login_bg.png';
import loginLogo from '@/assets/images/login_logo.svg';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import { memo } from 'react';
import {
  StyledFlex,
  StyledImage,
  StyledInvitedUsers,
  StyledLoginConnectWalletButton,
  StyledLoginVideo
} from './styles';

const LoginView = () => {
  const { connect, connecting } = useAuth();
  return (
    <StyledFlex style={{ height: '100vh' }} $gap="82px">
      <StyledImage>
        {/* <Image src={loginBg} style={{ width: 824, height: 636 }} alt='loginBg' /> */}
        <StyledLoginVideo width={824} height={636} autoPlay loop>
          <source src="/videos/login_background.mp4" type="video/mp4" />
          <track
            src="/path/to/captions.vtt"
            kind="subtitles"
            srcLang="en"
            label="English"
          />
          Your browser does not support the video tag.
        </StyledLoginVideo>
      </StyledImage>
      <StyledFlex $direction="column">
        <StyledImage style={{ marginBottom: 89 }}>
          <Image style={{ width: 409 }} src={loginLogo} alt="loginLogo" />
        </StyledImage>
        <StyledLoginConnectWalletButton
          onClick={() => {
            connect();
          }}
          disabled={connecting}
          data-bp="2001-001"
        >
          Connect Wallet
        </StyledLoginConnectWalletButton>
        <StyledInvitedUsers>💡 Invited users only</StyledInvitedUsers>
      </StyledFlex>
    </StyledFlex>
  );
};

export default memo(LoginView);
