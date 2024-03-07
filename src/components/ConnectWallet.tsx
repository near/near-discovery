import useConnectWallet from '@/hooks/useConnectWallet';
import styled from 'styled-components';

const StyledConnectWallet = styled.button`
  width: 164px;
  height: 46px;
  border-radius: 10px;
  background: #ebf479;
  padding: 0px 18px;
  color: #000;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export default function ConnectWallet() {
  const { onConnect } = useConnectWallet();
  return (
    <StyledConnectWallet
      onClick={() => {
        onConnect();
      }}
    >
      Connect Wallet
    </StyledConnectWallet>
  );
}
