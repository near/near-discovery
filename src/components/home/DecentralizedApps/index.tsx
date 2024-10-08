import { Flex, Grid, Text, Title } from '@near-pagoda/ui';
import { BookOpenText } from '@phosphor-icons/react';
import Image from 'next/image';
import styled from 'styled-components';

import {
  binance,
  bitget,
  bitte,
  here,
  ledger,
  metamask,
  meteor,
  myNear,
  safePal,
  sender,
  trustWallet,
  uniswap,
} from '@/assets/images/wallets';

import { Button } from '../Button';
import { Code } from '../Code';

const npxCNA = `
$> npx create-near-app@latest

✅ What do you want to build? › A Web App
✅ Select a framework for your frontend › NextJs (Classic)
✅ Name your project to create a contract: hello-app

Created 'hello-app', a web-app using NextJS (Classic):
 * cd hello-app
 * npm install
 * npm run dev
`;

const ReactApp = `
import { useEffect, useState } from 'react';

import { Navigation } from '@/components/navigation';
import { NetworkId } from '@/config';
import { NearContext, Wallet } from '@/wallets/near';

const wallet = new Wallet({ networkId: NetworkId });

export default function MyApp({ Component, pageProps }) {
  const [signedAccountId, setSignedAccountId] = useState('');

  useEffect(() => { wallet.startUp(setSignedAccountId) }, []);

  return (
    <NearContext.Provider value={{ wallet, signedAccountId }}>
      <Navigation />
      <Component {...pageProps} />
    </NearContext.Provider>
  );
}`;

const Carousel = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  width: 100%;
  height: 60px;
`;

const WalletImg = styled(Image)`
  margin: 0 2px;
  height: 40px;
  border-radius: 4px;
`;

export const DecentralizedApps = () => {
  return (
    <Flex stack justify="space-between" style={{ flex: 'auto', padding: '.5rem' }}>
      <Grid
        columns="55% minmax(0, 45%)"
        gap="xl"
        gapPhone="xl"
        gapTablet="xl"
        columnsPhone="minmax(0, 1fr)"
        columnsTablet="minmax(0, 1fr)"
        style={{ flex: 1 }}
      >
        <Flex stack justify="space-between">
          <Flex stack gap="m">
            <Text as="h1" style={{ fontWeight: 'normal' }}>
              Building Web3 Apps Has Never Been Easier
            </Text>
            <Text size="text-l" style={{ fontWeight: 'lighter' }}>
              Spin up a your first Web3 app in seconds, or use our APIs to supercharge your existing app
            </Text>
          </Flex>

          <Flex stack gap="l">
            <Code code={npxCNA} language="bash" />
          </Flex>
        </Flex>

        <Flex stack gap="m" justify="space-between" style={{ flexGrow: 1 }}>
          <Flex stack>
            <Title> NEAR React App </Title>
            <Code code={ReactApp} height={450} language="ts" />
          </Flex>
          <Carousel>
            <Title>Supported Wallets</Title>
            <WalletImg src={metamask} alt="Metamask" />
            <WalletImg src={binance} alt="Binance" />
            <WalletImg src={meteor} alt="Meteor" />
            <WalletImg src={bitte} alt="Bitte" />
            <WalletImg src={here} alt="Here" />
            <WalletImg src={bitget} alt="Bitget" />
            <WalletImg src={uniswap} alt="Uniswap" />
            <WalletImg src={ledger} alt="Ledger" />
            <WalletImg src={myNear} alt="MyNear" />
            <WalletImg src={safePal} alt="SafePal" />
            <WalletImg src={sender} alt="Sender" />
            <WalletImg src={trustWallet} alt="TrustWallet" />
          </Carousel>
        </Flex>
      </Grid>
      <Button
        size="large"
        iconLeft={<BookOpenText fill="bold" />}
        href="/documentation/build/web3-apps/quickstart"
        label="Start Now"
        style={{ marginTop: 'var(--gap-m)' }}
      />
    </Flex>
  );
};
