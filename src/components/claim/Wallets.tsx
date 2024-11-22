import { Flex } from '@near-pagoda/ui';
import Image from 'next/image';
import styled from 'styled-components';

import Meteor from '@/assets/images/meteor.svg';
import MyNearWallet from '@/assets/images/my_near_wallet.png';
import { networkId } from '@/config';

const StyledButton = styled.a`
  background-color: #1e2030;
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  &:hover {
    background-color: #101124;
  }
`;

const WalletButton = styled(StyledButton)`
  background-color: #212529;
  text-decoration: none;
  &:hover {
    background-color: #11111c;
  }
`;

const Wallets = ({ url }: { url: string }) => {
  // https://docs.keypom.xyz/docs/next/keypom-sdk/Core/modules#supportedlinkdropclaimpages
  const meteorWalletUrl = 'https://wallet.meteorwallet.app/linkdrop/';
  const myNearWalletUrl =
    networkId === 'testnet' ? 'https://testnet.mynearwallet.com/linkdrop/' : 'https://app.mynearwallet.com/linkdrop/';

  return (
    <Flex stack style={{ paddingTop: '1rem' }} gap="m">
      <WalletButton href={`${meteorWalletUrl}${url}`} target="_blank">
        <Image height={20} alt="Mintbase Logo" src={Meteor} />
        <span style={{ textDecoration: 'none', marginLeft: '1rem' }}>Meteor Wallet</span>
      </WalletButton>
      <WalletButton href={`${myNearWalletUrl}${url}`} target="_blank">
        <Image height={19} alt="My Near Wallet Logo" src={MyNearWallet} />
        <span style={{ textDecoration: 'none', marginLeft: '1rem' }}>My Near Wallet</span>
      </WalletButton>
    </Flex>
  );
};

export default Wallets;
