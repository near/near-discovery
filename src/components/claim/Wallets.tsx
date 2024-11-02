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

const MeteorButton = styled(StyledButton)`
  background-color: #212529;
  &:hover {
    background-color: #11111c;
  }
`;

const MyNearWalletButton = styled(StyledButton)`
  border: 1px solid #999;
  background-color: white;
  &:hover {
    background-color: #eee;
  }
`;

const Wallets = ({ url }: { url: string }) => {
  // https://docs.keypom.xyz/docs/next/keypom-sdk/Core/modules#supportedlinkdropclaimpages
  const meteorWalletUrl = 'https://wallet.meteorwallet.app/linkdrop/';
  const myNearWalletUrl =
    networkId === 'testnet' ? 'https://testnet.mynearwallet.com/linkdrop/' : 'https://app.mynearwallet.com/linkdrop/';

  return (
    <>
      <MeteorButton href={`${meteorWalletUrl}${url}`} target="_blank">
        <Image height={20} alt="Mintbase Logo" src={Meteor} />
      </MeteorButton>
      <MyNearWalletButton href={`${myNearWalletUrl}${url}`} target="_blank">
        <Image height={19} alt="My Near Wallet Logo" src={MyNearWallet} />
      </MyNearWalletButton>
    </>
  );
};

export default Wallets;
