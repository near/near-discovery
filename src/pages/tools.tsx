import { Button, Card, Container, Flex, Section, SvgIcon, Tabs, Text } from '@near-pagoda/ui';
import { Coin, Gift, ImagesSquare } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import Linkdrops from '@/components/tools/Linkdrops';
import NonFungibleToken from '@/components/tools/NonFungibleToken';
import { NearContext } from '@/components/WalletSelector';
import { useDefaultLayout } from '@/hooks/useLayout';
import useLinkdrops from '@/hooks/useLinkdrops';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import type { NextPageWithLayout } from '@/utils/types';
import FungibleToken from '@/components/tools/FungibleToken';
import useFungibleTokens from '@/hooks/useFungibleTokens';
import useNearBlocksTxns from '@/hooks/useNearBlocksTxns';

const processTransactionsToFt = (transactions) => {
  if(!transactions?.txns) return []

  return transactions.txns.map((txn) => {
    const ft = JSON.parse(txn.actions[0].args).args
    return{
      decimals: ft.metadata.decimals,
      icon: ft.metadata.icon,
      name: ft.metadata.name,
      symbol: ft.metadata.symbol,
      total_supply: ft.total_supply,
    }
  });
}

const processTransactionsToNFT = (transactions) => {
  if(!transactions?.txns) return []

  return transactions.txns.map((txn) => {
    const accepted = txn.outcomes.status
    const nft = JSON.parse(txn.actions[0].args)
    return{
      media: nft.token_metadata.media,
      title: nft.token_metadata.title,
      description: nft.token_metadata.description,
      token_id: nft.token_id,
      status: accepted
    }
  });
}

const ToolsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const selectedTab = (router.query.tab as string) || 'ft';
  const { signedAccountId } = useContext(NearContext);
  const drops = useLinkdrops();
  // const {tokens} = useFungibleTokens();
  const {transactions:ft} =useNearBlocksTxns("tkn.primitives.near","create_token");
  const ftProcessed = processTransactionsToFt(ft);

  const {transactions:nfts} =useNearBlocksTxns("nft.primitives.near","nft_mint");
  const nftsProcessed = processTransactionsToNFT(nfts);
  
  const { requestAuthentication } = useSignInRedirect();
  return (
    <Section grow="available" style={{ background: 'var(--sand3)' }}>
      <Container size="s">
        <Flex stack gap="l">
          <Text as="h1" size="text-2xl">
            Tools
          </Text>

          {signedAccountId ? (
            <Card style={{ paddingTop: 0 }}>
              <Tabs.Root value={selectedTab}>
                <Tabs.List style={{ marginBottom: 'var(--gap-m)' }}>
                  <Tabs.Trigger href="?tab=ft" value="ft">
                    <SvgIcon icon={<Coin fill="bold" />} />
                    Mint FT
                  </Tabs.Trigger>

                  <Tabs.Trigger href="?tab=nft" value="nft">
                    <SvgIcon icon={<ImagesSquare fill="bold" />} />
                    Mint NFT
                  </Tabs.Trigger>

                  <Tabs.Trigger href="?tab=linkdrops" value="linkdrops">
                    <SvgIcon icon={<Gift fill="bold" />} />
                    Linkdrops
                  </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="ft">
                  <FungibleToken tokens={ftProcessed}/>
                </Tabs.Content>

                <Tabs.Content value="nft">
                  <NonFungibleToken tokens={nftsProcessed} />
                </Tabs.Content>

                <Tabs.Content value="linkdrops">
                  <Linkdrops drops={drops} />
                </Tabs.Content>
              </Tabs.Root>
            </Card>
          ) : (
            <Card>
              <Text>Please sign in to use wallet utilities</Text>
              <Button label="Sign In" fill="outline" onClick={() => requestAuthentication()} />
            </Card>
          )}
        </Flex>
      </Container>
    </Section>
  );
};

ToolsPage.getLayout = useDefaultLayout;

export default ToolsPage;
