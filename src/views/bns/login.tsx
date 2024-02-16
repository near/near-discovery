import loginLogo from '@/assets/images/login_logo.svg';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import { memo } from 'react';
import {
  StyledFlex,
  StyledImage,
  StyledInvitedAward,
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
        <StyledLoginVideo width={824} height={636} autoPlay muted playsInline loop>
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
        <StyledInvitedUsers>Invited users only</StyledInvitedUsers>
        <StyledLoginConnectWalletButton
          onClick={() => {
            connect();
          }}
          disabled={connecting}
          data-bp="2001-001"
        >
          Connect Wallet
        </StyledLoginConnectWalletButton>
        <StyledInvitedAward>💡 Connect by Bitget to earn an extra 10% PTS of quest.</StyledInvitedAward>
      </StyledFlex>
    </StyledFlex>
  );
};

export default memo(LoginView);
