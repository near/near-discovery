import styled from 'styled-components';
import { useConnectWallet } from '@web3-onboard/react';

const StyledConnectWallet = styled.button`
  height: 38px;
  border: 1px solid #373a53;
  border-radius: 8px;
  background-color: rgba(55, 58, 83, 0.5);
  padding: 0px 10px;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
`;

export default function ConnectWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  return (
    <StyledConnectWallet
      onClick={() => {
        connect();
      }}
    >
      Connect Wallet
    </StyledConnectWallet>
  );
}
