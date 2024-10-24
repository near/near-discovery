import { Card, Container, Flex, Section, SvgIcon, Tabs, Text } from '@near-pagoda/ui';
import { Building, BuildingOffice, Coin, Gift, ImagesSquare } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';

import NearIconSvg from '@/assets/images/near-icon.svg';
import DAO from '@/components/tools/DAO';
import FungibleToken from '@/components/tools/FungibleToken';
import Linkdrops from '@/components/tools/Linkdrops';
import Multisig from '@/components/tools/Multisig';
import NonFungibleToken from '@/components/tools/NonFungibleToken';
import { NearContext } from '@/components/wallet-selector/WalletSelector';
import { network } from '@/config';
import { useDefaultLayout } from '@/hooks/useLayout';
import useLinkdrops from '@/hooks/useLinkdrops';
import type { Collection, FT, NextPageWithLayout, NFT } from '@/utils/types';
import whiteList from '@/utils/white-list.json';

const NearToken: FT = {
  contract_id: 'near',
  balance: '0',
  verified: true,
  metadata: {
    decimals: 24,
    name: 'NEAR',
    symbol: 'NEAR',
    icon: NearIconSvg,
  },
};

const ToolsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const selectedTab = (router.query.tab as string) || 'ft';
  const { wallet, signedAccountId } = useContext(NearContext);
  const { drops, reloadLinkdrops } = useLinkdrops();
  const [allFT, setAllFT] = useState<FT[]>([NearToken]);
  const [allNFT, setAllNFT] = useState<Collection[]>([]);
  const [loadingFT, setLoadingFT] = useState(false);
  const [loadingNFT, setLoadingNFT] = useState(false);

  const fetchTokens = useCallback(async () => {
    if (!signedAccountId) return { fts: [], nfts: [] };

    const response = await fetch(`${network.apiNearBlocks}/v1/account/${signedAccountId}/tokens`);
    if (!response.ok) return;

    const data = await response.json();
    return data.tokens;
  }, [signedAccountId]);

  const processFT = useCallback(
    async (ft_contracts: string[]) => {
      if (!ft_contracts.length) return [];
      setLoadingFT(true);

      const getFTData = async (contract_id: string) => {
        try {
          const balance = await wallet?.viewMethod({
            contractId: contract_id,
            method: 'ft_balance_of',
            args: { account_id: signedAccountId },
          });
          if (balance === '0') return { contract_id, balance, metadata: {}, verified: false };
          const metadata = await wallet?.viewMethod({ contractId: contract_id, method: 'ft_metadata' });
          const verified = whiteList.filter((item) => item.contract_id === contract_id).length > 0;
          return { contract_id, balance, metadata, verified };
        } catch (e) {
          return { contract_id, balance: '0', metadata: {}, verified: false };
        }
      };

      // the first FT is always NEAR
      const balance = await wallet?.getBalance(signedAccountId);
      NearToken.balance = balance;
      let all_fts = [NearToken];

      let other_fts = await Promise.all(ft_contracts.map((ft) => getFTData(ft)));
      other_fts = other_fts.filter((ft) => ft.balance !== '0');
      all_fts = all_fts.concat(other_fts);
      all_fts = all_fts.sort((a, b) => Number(b.verified) - Number(a.verified));

      setAllFT(all_fts);
      setLoadingFT(false);
    },
    [wallet, signedAccountId],
  );

  const processNFT = useCallback(
    async (nft_contracts: string[]) => {
      if (!nft_contracts.length) return [];
      setLoadingNFT(true);

      const getNFTsForContract = async (contract_id: string): Promise<{ [contract_id: string]: NFT[] }> => {
        try {
          let nfts = await wallet?.viewMethod({
            contractId: contract_id,
            method: 'nft_tokens_for_owner',
            args: { account_id: signedAccountId },
          });
          nfts = nfts.map((nft: NFT) => ({ ...nft, contract_id }));
          return { [contract_id]: nfts };
        } catch (e) {
          return { [contract_id]: [] };
        }
      };

      let nfts = [];
      nfts = await Promise.all(nft_contracts.map((contract_id) => getNFTsForContract(contract_id)));
      nfts = nfts.filter((nft) => nft[Object.keys(nft)[0]].length > 0);

      setAllNFT(nfts);
      setLoadingNFT(false);
    },
    [wallet, signedAccountId],
  );

  const reload = useCallback(
    async (delay: number, type: string) => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      const tokens = await fetchTokens();
      if (type === 'fts') processFT(tokens.fts);
      if (type === 'nfts') processNFT(tokens.nfts);
    },
    [fetchTokens, processFT, processNFT],
  );

  useEffect(() => {
    const init = async () => {
      const tokens = await fetchTokens();
      processFT(tokens.fts);
      processNFT(tokens.nfts);
    };
    init();
  }, [fetchTokens, processFT, processNFT, signedAccountId]);

  return (
    <Section grow="available" style={{ background: 'var(--sand3)' }}>
      <Container size="s" style={{ display: 'flex', justifyContent: 'center' }}>
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
                <Tabs.Trigger href="?tab=dao" value="dao">
                  <SvgIcon icon={<BuildingOffice fill="bold" />} />
                  DAOs
                </Tabs.Trigger>
                <Tabs.Trigger href="?tab=multisig" value="multisig">
                  <SvgIcon icon={<Building fill="bold" />} />
                  Multi-Signatures
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="ft">
                <FungibleToken user_fts={allFT} loading={loadingFT} reload={(d) => reload(d, 'fts')} />
              </Tabs.Content>

              <Tabs.Content value="nft">
                <NonFungibleToken user_collections={allNFT} loading={loadingNFT} reload={(d) => reload(d, 'nfts')} />
              </Tabs.Content>

              <Tabs.Content value="linkdrops">
                <Linkdrops
                  user_fts={allFT}
                  user_collections={allNFT}
                  drops={drops}
                  reloadFT={(d) => reload(d, 'fts')}
                  reloadNFT={(d) => reload(d, 'nfts')}
                  reloadDrops={reloadLinkdrops}
                />
              </Tabs.Content>

              <Tabs.Content value="dao">
                <DAO />
              </Tabs.Content>

              <Tabs.Content value="multisig">
                <Multisig />
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
