import { Flex, Grid, Switch, Tabs, Text, Title } from "@near-pagoda/ui";
import styled from "styled-components";

import { Code } from "../Code";
import { BookOpenText } from "@phosphor-icons/react";
import { Button } from "../Button";

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
}`

const Carousel = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  width: 100%;
  height: 60px;
`;

const Placeholder = styled.div`
  background-color: #000;
  min-width: 60px;
  height: 100%;
`;

export const DecentralizedApps = () => {

  return <>

    <Grid columns="55% minmax(0, 45%)" gap="xl" columnsPhone="minmax(0, 1fr)" columnsTablet="minmax(0, 1fr)" style={{ flexGrow: 1, padding: "0.5rem" }}>

      <Flex stack style={{ justifyContent: "space-between" }}>
        <Flex stack gap="m" >
          <Text as="h1" style={{ fontWeight: "normal" }}> Building Web3 Apps Has Never Been Easier </Text>
          <Text size="text-l" style={{ fontWeight: "lighter" }}>
            Spin up a your first Web3 app in seconds, or use our APIs to supercharge your existing app
          </Text>
        </Flex>

        <Flex stack gap="l">
          <Code code={npxCNA} language="bash" />
        </Flex>
      </Flex>

      <Flex stack gap="m" style={{flexGrow: 1, justifyContent: "space-between"}} >
        <Flex stack>
          <Title> Near React App </Title>
          <Code code={ReactApp} height={450} language="ts" />
        </Flex>

        <Carousel>
          <Title> Supported Wallets </Title>
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </Carousel>
      </Flex>
    </Grid>
    <Button size="large" iconLeft={<BookOpenText fill="bold" />} href="/documentation/build/web3-apps/quickstart" label="Start Now!" style={{ marginTop: "var(--gap-m)" }} />
  </>
}