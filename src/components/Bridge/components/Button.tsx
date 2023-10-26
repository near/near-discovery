import { memo, useMemo } from 'react';
import styled from 'styled-components';
import LoadingIcon from '@/components/Icons/Loading';
import useApprove from '@/hooks/useApprove';
import useSwitchChain from '@/hooks/useSwitchChain';
import { chainCofig } from '@/config/bridge';
import Big from 'big.js';

import type { Token, Chain } from '../types';

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
  chainId,
  checking,
  swap,
  swaping,
  onSuccess,
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
  swap: Function;
  swaping?: boolean;
}) => {
  const { switching, switchNetwork } = useSwitchChain();

  const isWrongNetwork = useMemo(() => chainId !== inputChain?.chainId, [chainId, inputChain]);

  const spender = useMemo(() => {
    if (!inputChain || !inputToken || inputChain.chainId !== chainId) return '';
    return inputToken.isNative ? chainCofig[inputChain.chainId].ethRouter : chainCofig[inputChain?.chainId].router;
  }, [inputChain, inputToken, chainId]);

  const { approved, approve, approving } = useApprove({
    token: inputToken,
    amount,
    chain: inputChain,
    spender,
  });

  if (errorTips) {
    return <StyledButton disabled>{errorTips}</StyledButton>;
  }

  if (!amount || new Big(amount).eq(0)) {
    return <StyledButton disabled>Enter An Amount</StyledButton>;
  }

  if (isWrongNetwork && inputChain) {
    return (
      <StyledButton
        disabled={switching}
        onClick={() => {
          switchNetwork(inputChain);
        }}
      >
        {switching && <LoadingIcon />}
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
        if (!inputToken || !inputChain || !outputToken || !outputChain) return;
        swap({
          token: inputToken,
          chain: inputChain,
          targetToken: outputToken,
          targetChain: outputChain,
          destination,
          amount,
          onSuccess,
        });
      }}
      disabled={swaping || !inputToken || !inputChain || !outputToken || !outputChain}
    >
      {swaping && <LoadingIcon />}
      Transfer
    </StyledButton>
  );
};

export default memo(Button);
