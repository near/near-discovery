import useToast from '@/hooks/useToast';
import { memo, useEffect } from 'react';
import {
  StyledButton,
  StyledDialog,
  StyledDialogContainer,
  StyledFlex,
  StyledText
} from './styles';
import Image from 'next/image';

const SwitchNetwork = ({ onClose }: any) => {

  const toast = useToast()


  useEffect(() => {
    setRegisterStatus(0)
  }, [])
  return (
    <StyledDialog>
      <StyledDialogContainer>
        <StyledFlex>
          <Image src='https://assets.dapdap.net/images/bafkreif24bmxzparik2t2nkog6km5diuwcysvxdv2j5ygzkzwm3pxs573a.svg' />
          <StyledText></StyledText>
        </StyledFlex>
        <StyledText></StyledText>
        <StyledButton></StyledButton>
      </StyledDialogContainer>
    </StyledDialog>
  );
};

export default memo(SwitchNetwork);
