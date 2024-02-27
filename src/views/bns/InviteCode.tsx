import { getAccessToken, inviteCodeActivate } from '@/apis';
import enterButton from '@/assets/images/enter_button.svg';
import iconWarning from '@/assets/images/icon_warning.svg';
import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';
import { useConnectWallet } from '@web3-onboard/react';
import { setCookie } from 'cookies-next';
import _ from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { memo, useRef, useState } from 'react';
import {
  StyledCodeInput,
  StyledCodeInputWrapper,
  StyledErrorTips,
  StyledFlex,
  StyledImage,
  StyledLoadingWrapper,
  StyledLoginVideo,
  StyledSvg,
  StyledText,
  StyledWrapper,
} from './styles';
const LoginView = () => {
  const router = useRouter();
  const { account } = useAccount();
  const toast = useToast();
  const [codeList, setCodeList] = useState(new Array(6).fill(''));
  const [errorTips, setErrorTips] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [proceed, setProceed] = useState(false);
  const { logging, logout } = useAuth();
  const [{ wallet }] = useConnectWallet();
  const inputRef = useRef<any>([]);

  const handleChange = function (event: any, index: number) {
    const value = event.target.value;
    const curr = _.cloneDeep(codeList);
    curr[index] = value;
    setCodeList(curr);
    curr[index] && inputRef.current[index + 1] && inputRef.current[index + 1].focus();
  };
  const handleKeyDown = function (event: any, index: number) {
    if (event.code === 'Backspace') {
      const curr = _.cloneDeep(codeList);
      curr[index] = '';
      setCodeList(curr);
      inputRef.current[index - 1] && inputRef.current[index - 1].focus();
    }
  };
  const handlePaste = function (event: any) {
    const text = event.clipboardData.getData('text');
    if (text.length !== 6) {
      setErrorTips('Invalid invite code. Please try another');
      return;
    }
    const array = text.split('');
    setCodeList(array);
    inputRef.current && inputRef.current[array.length - 1].focus();
  };
  const handleProceed = async () => {
    const code = codeList.join('');
    if (!account || !code || loading) return;
    setLoading(true);
    try {
      const isBitget = wallet?.label.toLowerCase().includes('bitget');
      const { isSuccess, errorMsg } = await inviteCodeActivate(account, code, isBitget ? 'bitget_wallet' : '');
      if (!isSuccess) {
        setLoading(false);
        setErrorTips(errorMsg);
      } else {
        await getAccessToken(account);
        // setLoading(false);
        setCookie('AUTHED_ACCOUNT', account);
        router.replace('/landing');
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <StyledFlex style={{ height: '100vh' }} $gap="70px">
      <StyledImage>
        {/* <Image src={loginBg} style={{ width: 824, height: 636 }} alt='loginBg' /> */}
        <StyledLoginVideo width={824} height={636} autoPlay muted playsInline loop>
          <source src="https://s3.amazonaws.com/dapdap.prod/images/login_background.mp4" type="video/mp4" />
          <track src="/path/to/captions.vtt" kind="subtitles" srcLang="en" label="English" />
          Your browser does not support the video tag.
        </StyledLoginVideo>
      </StyledImage>
      <StyledWrapper style={{ width: 517 }}>
        <StyledText $size="42px" $line="161.2%">
          Got an invite code?
        </StyledText>
        <StyledText $size="18px" $weight="400" $line="161.2%" style={{ marginBottom: 19 }}>
          Get an invite code from an existing user to sign up.
        </StyledText>
        {loading ? (
          <StyledLoadingWrapper>
            <Loading size={60} />
          </StyledLoadingWrapper>
        ) : (
          <StyledFlex $align="flex-end" $justify="flex-start" $gap="8px">
            {codeList.map((code, index) => (
              <StyledCodeInputWrapper key={index}>
                <StyledCodeInput
                  value={code}
                  ref={(ref) => (inputRef.current[index] = ref)}
                  onChange={(event) => handleChange(event, index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  onPaste={(event) => handlePaste(event)}
                  maxLength={1}
                />
              </StyledCodeInputWrapper>
            ))}
            {codeList.join('').length === 6 ? (
              <StyledSvg
                style={{ cursor: 'pointer' }}
                className={proceed ? 'proceed' : ''}
                onMouseDown={() => setProceed(true)}
                onMouseUp={() => {
                  setProceed(false);
                  handleProceed();
                }}
              >
                <Image src={enterButton} alt="enterButton" />
              </StyledSvg>
            ) : (
              <StyledSvg style={{ opacity: 0.5 }}>
                <Image src={enterButton} alt="enterButton" />
              </StyledSvg>
            )}
          </StyledFlex>
        )}
        {errorTips && (
          <StyledErrorTips>
            <Image src={iconWarning} alt="iconWarning" /> {errorTips}
          </StyledErrorTips>
        )}
      </StyledWrapper>
    </StyledFlex>
  );
};

export default memo(LoginView);
