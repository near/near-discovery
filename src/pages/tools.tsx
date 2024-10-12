import { Card, Container, Flex, Section, SvgIcon, Tabs, Text } from '@near-pagoda/ui';
import { Coin, Gift, ImagesSquare } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';

import FungibleToken from '@/components/tools/FungibleToken';
import Linkdrops from '@/components/tools/Linkdrops';
import NonFungibleToken from '@/components/tools/NonFungibleToken';
import { NearContext } from '@/components/wallet-selector/WalletSelector';
import { network } from '@/config';
import { useDefaultLayout } from '@/hooks/useLayout';
import useLinkdrops from '@/hooks/useLinkdrops';
import type { FT, NextPageWithLayout, NFT } from '@/utils/types';

const ToolsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const selectedTab = (router.query.tab as string) || 'ft';
  const { wallet, signedAccountId } = useContext(NearContext);
  const { drops, reloadLinkdrops } = useLinkdrops();
  const [allFT, setAllFT] = useState<FT[]>([]);
  const [allNFT, setAllNFT] = useState<NFT[]>([]);

  const fetchTokens = useCallback(
    async (type: string) => {
      const response = await fetch(`${network.fastNearApi}/v1/account/${signedAccountId}/${type}`);

      if (!response.ok) return;

      const tokens = await response.json();
      return tokens;
    },
    [signedAccountId],
  );

  const fetchFT = useCallback(async () => {
    const tokens = await fetchTokens('ft');
    if (!tokens) return;

    const parseFTMetadata = async ({ contract_id, balance }: { contract_id: string; balance: string }) => {
      const metadata = await wallet?.viewMethod({ contractId: contract_id, method: 'ft_metadata' });
      return { contract_id, balance, metadata };
    };

    // parse FT
    const fast_fts = tokens.tokens.filter((token: any) => Number(token.balance) > 0);
    const all_fts = [];

    for (const ft of fast_fts) {
      try {
        const ft_data = await parseFTMetadata(ft);
        all_fts.push(ft_data);
      } catch (e) {
        console.log(e);
      }
    }

    setAllFT(all_fts);
  }, [wallet, fetchTokens, setAllFT]);

  const fetchNFT = useCallback(async () => {
    const tokens = await fetchTokens('nft');
    if (!tokens) return;

    const getNFTsForContract = async ({ contract_id }: { contract_id: string }) => {
      const nfts = await wallet?.viewMethod({
        contractId: contract_id,
        method: 'nft_tokens_for_owner',
        args: { account_id: signedAccountId },
      });
      const ret: any = {};
      ret[contract_id] = nfts;
      return ret;
    };

    const fast_nfts = tokens.tokens;
    const nfts = [];

    for (const nft of fast_nfts) {
      try {
        const nft_data = await getNFTsForContract(nft);
        const res: any = {};
        res[nft] = nft_data;
        nfts.push(res);
      } catch (e) {
        console.log(e);
      }
    }

    setAllNFT(nfts);
  }, [wallet, signedAccountId, fetchTokens]);

  useEffect(() => {
    if (!signedAccountId) return;
    fetchFT();
    fetchNFT();
  }, [fetchFT, fetchNFT, signedAccountId]);

  return (
    <Section grow="available" style={{ background: 'var(--sand3)' }}>
      <Container size="s">
        <Flex stack gap="l">
          <Text as="h1" size="text-2xl">
            Tools
          </Text>

          <Card style={{ paddingTop: 0 }}>
            <Tabs.Root value={selectedTab}>
              <Tabs.List style={{ marginBottom: 'var(--gap-m)' }}>
                <Tabs.Trigger href="?tab=ft" value="ft">
                  <SvgIcon icon={<Coin fill="bold" />} />
                  Fungible Tokens
                </Tabs.Trigger>

                <Tabs.Trigger href="?tab=nft" value="nft">
                  <SvgIcon icon={<ImagesSquare fill="bold" />} />
                  Non-Fungible Tokens
                </Tabs.Trigger>

                <Tabs.Trigger href="?tab=linkdrops" value="linkdrops">
                  <SvgIcon icon={<Gift fill="bold" />} />
                  Linkdrops
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="ft">
                <FungibleToken tokens={allFT} reload={fetchFT} />
              </Tabs.Content>

              <Tabs.Content value="nft">
                <NonFungibleToken tokens={allNFT} reload={fetchNFT} />
              </Tabs.Content>

              <Tabs.Content value="linkdrops">
                <Linkdrops drops={drops} reload={reloadLinkdrops} />
              </Tabs.Content>
            </Tabs.Root>
          </Card>
        </Flex>
      </Container>
    </Section>
  );
};

ToolsPage.getLayout = useDefaultLayout;

export default ToolsPage;
