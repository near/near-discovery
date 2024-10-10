import { Button, Card, Container, Flex, Section, SvgIcon, Tabs, Text } from '@near-pagoda/ui';
import { Coin, Gift, ImagesSquare } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import FungibleToken from '@/components/tools/FungibleToken';
import Linkdrops from '@/components/tools/Linkdrops';
import NonFungibleToken from '@/components/tools/NonFungibleToken';
import { NearContext } from '@/components/wallet-selector/WalletSelector';
import { network } from '@/config';
import { useDefaultLayout } from '@/hooks/useLayout';
import useLinkdrops from '@/hooks/useLinkdrops';
import type { Txns } from '@/hooks/useNearBlocksTxns';
import useNearBlocksTxns from '@/hooks/useNearBlocksTxns';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import type { NextPageWithLayout, NFT } from '@/utils/types';

export type FT = {
  decimals: number;
  icon: string;
  name: string;
  symbol: string;
  total_supply: string;
};

const processTransactionsToFt = (transactions: Txns[]): FT[] => {
  if (!transactions) return [];

  return transactions.map((txn) => {
    const ft = JSON.parse(txn.actions[0].args).args;
    return {
      decimals: ft.metadata.decimals,
      icon: ft.metadata.icon,
      name: ft.metadata.name,
      symbol: ft.metadata.symbol,
      total_supply: ft.total_supply,
    };
  });
};

const processTransactionsToNFT = (contract_id: string, owner_id: string, transactions: Txns[]): NFT[] => {
  if (!transactions) return [];
  return transactions.map((txn) => {
    const args = JSON.parse(txn.actions[0].args);
    return {
      contract_id: contract_id,
      token_id: args.token_id,
      metadata: args.token_metadata,
      owner_id,
      approved_account_ids: null,
    };
  });
};

const ToolsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const selectedTab = (router.query.tab as string) || 'ft';
  const { signedAccountId } = useContext(NearContext);
  const { drops, reloadLinkdrops } = useLinkdrops();

  const { transactions: fts, reloadTokens: reloadFT } = useNearBlocksTxns(network.ftContract, 'create_token');
  const ftProcessed = processTransactionsToFt(fts);

  const { transactions: nfts, reloadTokens: reloadNFT } = useNearBlocksTxns(network.nftContract, 'nft_mint');
  const nftsProcessed = processTransactionsToNFT(network.nftContract, signedAccountId, nfts);
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
                  <FungibleToken tokens={ftProcessed} reload={reloadFT} />
                </Tabs.Content>

                <Tabs.Content value="nft">
                  <NonFungibleToken tokens={nftsProcessed} reload={reloadNFT} />
                </Tabs.Content>

                <Tabs.Content value="linkdrops">
                  <Linkdrops drops={drops} reload={reloadLinkdrops} />
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
