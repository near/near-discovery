import { useSetChain } from '@web3-onboard/react';
import { memo, useMemo } from 'react';
import styled from 'styled-components';

import LoadingIcon from '@/components/Icons/Loading';
import { chainCofig } from '@/config/bridge';
import useApprove from '@/hooks/useApprove';

import type { Chain, Token } from '../types';

const StyledButton = styled.button`
  font-size: 18px;
  font-weight: 500;
  color: #000;
  width: 100%;
  height: 56px;
  border-radius: 10px;
  background-color: #ebf479;
  margin-top: 20px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  &:disabled {
    opacity: 0.8;
  }
`;

const Button = ({
  errorTips,
  inputToken,
  amount,
  inputChain,
  outputToken,
  outputChain,
  destination,
  checking,
  swap,
  swaping,
  route,
  onSuccess,
  onFail,
}: {
  errorTips: string;
  inputToken?: Token;
  amount?: string;
  inputChain?: Chain;
  outputToken?: Token;
  outputChain?: Chain;
  destination?: string;
  chainId?: number;
  checking?: boolean;
  onSuccess: (hash: string) => void;
  onFail?: () => void;
  swap: any;
  route?: any;
  swaping?: boolean;
}) => {
  const [{ settingChain, connectedChain }, setChain] = useSetChain();

  const isWrongNetwork = useMemo(
    () => Number(connectedChain?.id) !== inputChain?.chainId,
    [connectedChain?.id, inputChain],
  );

  const spender = useMemo(() => {
    if (!inputChain || !inputToken || inputChain.chainId !== Number(connectedChain?.id)) return '';
    if (!chainCofig[inputChain?.chainId]) {
      return ''
    }
    return inputToken.isNative ? chainCofig[inputChain.chainId].ethRouter : chainCofig[inputChain?.chainId].router;
  }, [inputChain, inputToken, connectedChain?.id]);

  const { approved, approve, approving } = useApprove({
    token: inputToken,
    amount,
    chain: inputChain,
    spender,
  });

  if (errorTips) {
    return <StyledButton disabled>{errorTips}</StyledButton>;
  }

  if (isWrongNetwork && inputChain) {
    return (
      <StyledButton
        disabled={settingChain}
        onClick={() => {
          setChain({ chainId: `0x${inputChain.chainId.toString(16)}` });
        }}
      >
        {settingChain && <LoadingIcon />}
        {`Switch network to ${inputChain.chainName}`}
      </StyledButton>
    );
  }
  if (!approved) {
    return (
      <StyledButton onClick={approve} disabled={approving}>
        {approving && <LoadingIcon />}
        Approve
      </StyledButton>
    );
  }
  if (checking) {
    return (
      <StyledButton disabled={true}>
        <LoadingIcon />
        Check
      </StyledButton>
    );
  }

  return (
    <StyledButton
      onClick={() => {
        if (!inputToken || !inputChain || !outputToken || !outputChain || !amount) return;
        swap({
          token: inputToken,
          chain: inputChain,
          targetToken: outputToken,
          targetChain: outputChain,
          destination,
          amount,
          route,
          onSuccess,
          onFail,
        })
      }}
      disabled={swaping || !inputToken || !inputChain || !outputToken || !outputChain}
    >
      {swaping && <LoadingIcon />}
      Transfer
    </StyledButton>
  );
};

export default memo(Button);
