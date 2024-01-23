import useTokensAndChains from '@/components/Bridge/hooks/useTokensAndChains';
import { useSetChain } from '@web3-onboard/react';
import Image from 'next/image';
import { memo, useEffect, useMemo } from 'react';
import {
  StyledButton,
  StyledDialog,
  StyledDialogContainer,
  StyledFlex,
  StyledText
} from './styles';

const SwitchNetwork = ({ onClose, chainId }: any) => {

  const { chains } = useTokensAndChains()
  const [{ connectedChain, settingChain }, setChain] = useSetChain();
  const chain = useMemo(() => chains[chainId], [chains])
  const handleSwitch = async function () {
    const result = await setChain({ chainId: `0x${Number(chainId).toString(16)}` });
    if (result) {
      onClose()
    }
  }
  useEffect(() => {
  }, [])
  return (
    <StyledDialog>
      <StyledDialogContainer>
        <StyledFlex $gap='8px'>
          <Image width={26} height={26} src={chain.icon} alt='chainImage' />
          <StyledText $size='18px' $weight='500'>{chain.chainName}</StyledText>
        </StyledFlex>
        <StyledText $size='18px' $weight='700' style={{ marginTop: 17, marginBottom: 22 }}>Please connect to {chain.chainName}</StyledText>
        <StyledButton
          $height='46px'
          $borderWidth='0'
          $background='#0038FF'
          $borderRadius='8px'
          onClick={handleSwitch}
        >
          <StyledText $size='18px' $weight='700'>Switch Network</StyledText>
        </StyledButton>
        <StyledButton $background='transparent' $borderWidth='0' onClick={onClose}>
          <StyledText $color='#979ABE' $size='14px'>Close</StyledText>
        </StyledButton>
      </StyledDialogContainer>
    </StyledDialog>
  );
};

export default memo(SwitchNetwork);
