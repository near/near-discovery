import { Card, Container, Flex, Section, SvgIcon, Tabs, Text } from '@near-pagoda/ui';
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { BuildingOffice, Coin, Gift, ImagesSquare } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import NearIconSvg from '@/assets/images/near-icon.svg';
import DecentralizedOrganization from '@/components/tools/DecentralizedOrganization';
import FungibleToken from '@/components/tools/FungibleToken';
import Linkdrops from '@/components/tools/Linkdrops';
import NonFungibleToken from '@/components/tools/NonFungibleToken';
import { network } from '@/config';
import { useDefaultLayout } from '@/hooks/useLayout';
import useLinkdrops from '@/hooks/useLinkdrops';
import type { Collection, DAO, FT, NextPageWithLayout, NFT } from '@/utils/types';
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
  const { getBalance, viewFunction, signedAccountId } = useWalletSelector();
  const { drops, reloadLinkdrops } = useLinkdrops();
  const [allFT, setAllFT] = useState<FT[]>([NearToken]);
  const [allNFT, setAllNFT] = useState<Collection[]>([]);
  const [allDAO, setAllDAO] = useState<DAO[]>([]);
  const [loadingFT, setLoadingFT] = useState(false);
  const [loadingNFT, setLoadingNFT] = useState(false);
  const [loadingDAO, setLoadingDAO] = useState(false);

  const fetchTokens = useCallback(async () => {
    if (!signedAccountId) return { fts: [], nfts: [] };

    const response = await fetch(`${network.apiNearBlocks}/v1/account/${signedAccountId}/tokens`);
    if (!response.ok) return { fts: [], nfts: [] };

    const data = await response.json();
    return data.tokens;
  }, [signedAccountId]);

  const processFT = useCallback(
    async (ft_contracts: string[]) => {
      if (!signedAccountId) return [];
      if (!ft_contracts.length) return [];
      setLoadingFT(true);

      const getFTData = async (contract_id: string) => {
        try {
          const balance = (await viewFunction({
            contractId: contract_id,
            method: 'ft_balance_of',
            args: { account_id: signedAccountId },
          })) as any;
          if (balance === '0') return { contract_id, balance, metadata: {}, verified: false };
          const metadata = (await viewFunction({ contractId: contract_id, method: 'ft_metadata' })) as any;
          const verified = whiteList.filter((item) => item.contract_id === contract_id).length > 0;
          return { contract_id, balance, metadata, verified };
        } catch (e) {
          return { contract_id, balance: '0', metadata: {}, verified: false };
        }
      };

      // the first FT is always NEAR
      const balance = await getBalance(signedAccountId);
      NearToken.balance = balance.toString();
      let all_fts = [NearToken];

      let other_fts = await Promise.all(ft_contracts.map((ft) => getFTData(ft)));
      other_fts = other_fts.filter((ft) => ft.balance !== '0');
      all_fts = all_fts.concat(other_fts);
      all_fts = all_fts.sort((a, b) => Number(b.verified) - Number(a.verified));

      setAllFT(all_fts);
      setLoadingFT(false);
    },
    [getBalance, signedAccountId, viewFunction],
  );

  const processNFT = useCallback(
    async (nft_contracts: string[]) => {
      if (!nft_contracts.length) return [];
      setLoadingNFT(true);

      const getNFTsForContract = async (contract_id: string): Promise<{ [contract_id: string]: NFT[] }> => {
        try {
          let nfts = (await viewFunction({
            contractId: contract_id,
            method: 'nft_tokens_for_owner',
            args: { account_id: signedAccountId },
          })) as any;
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
    [viewFunction, signedAccountId],
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

  const fetchDaos = useCallback(async (): Promise<string[]> => {
    if (!signedAccountId) return [];

    const url = new URL(`/v1/account/${signedAccountId}/txns-only`, network.apiNearBlocks);
    url.searchParams.set('page', '1');
    url.searchParams.set('page', '10');
    url.searchParams.set('order', 'desc');
    url.searchParams.set('method', 'create');
    url.searchParams.set('to', network.daoContract);

    const response = await fetch(url);
    if (!response.ok) return [];

    const data = await response.json();

    const daos = (data?.txns || [])
      .map((tx: any) => {
        if (!tx.outcomes?.status) return;

        const action = tx.actions?.[0];

        if (!action) return;

        try {
          const args = JSON.parse(action.args);

          return [args.name, network.daoContract].join('.');
        } catch (error) {
          console.error(`Error while parsing create DAO tx: ${error}`);
          return;
        }
      })
      .filter(Boolean);

    return Array.from(new Set(daos));
  }, [signedAccountId]);

  const processDAO = useCallback(
    async (daos: string[]) => {
      if (!daos.length) return [];
      setLoadingDAO(true);

      const getDAOData = async (contract_id: string): Promise<DAO> => {
        try {
          const config = (await viewFunction({
            contractId: contract_id,
            method: 'get_config',
            args: {},
          })) as any;

          const metadata = JSON.parse(Buffer.from(config.metadata, 'base64').toString());

          let logo_data;
          if (metadata.flagLogo) {
            const logo_response = await fetch(metadata.flagLogo);
            const logo_blob = await logo_response.blob();
            logo_data = URL.createObjectURL(logo_blob);
          }

          return {
            contract_id: contract_id,
            public_name: metadata.displayName,
            description: config.purpose,
            metadata: {
              logo_url: metadata.flagLogo,
              cover_url: metadata.flagCover,
              logo_data: logo_data,
            },
          };
        } catch (error) {
          console.error(`Error happened while fetching DAO config: ${error}`);
          return {
            contract_id,
            public_name: '',
            description: '',
            metadata: { logo_url: undefined, cover_url: undefined, logo_data: undefined },
          };
        }
      };

      const promises = daos.map((dao) => getDAOData(dao));
      const all_daos = await Promise.all(promises);

      setAllDAO(all_daos);
      setLoadingDAO(false);
    },
    [viewFunction],
  );

  const reloadDao = useCallback(
    async (delay: number) => {
      await new Promise((resolve) => setTimeout(resolve, delay));

      const daos = await fetchDaos();
      await processDAO(daos);
    },
    [fetchDaos, processDAO],
  );

  useEffect(() => {
    const init = async () => {
      // load Fungible & Non-Fungible tokens
      const tokens = await fetchTokens();
      processFT(tokens.fts);
      processNFT(tokens.nfts);

      // load Decentralized Organizations
      const daos = await fetchDaos();
      processDAO(daos);
    };
    init();
  }, [fetchDaos, fetchTokens, processDAO, processFT, processNFT, signedAccountId]);

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
                {/* <Tabs.Trigger href="?tab=multisig" value="multisig">
                  <SvgIcon icon={<Building fill="bold" />} />
                  Multi-Signatures
                </Tabs.Trigger> */}
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
                <DecentralizedOrganization loading={loadingDAO} user_daos={allDAO} reload={(d) => reloadDao(d)} />
              </Tabs.Content>

              {/* <Tabs.Content value="multisig">
                <Multisig />
              </Tabs.Content> */}
            </Tabs.Root>
          </Card>
        </Flex>
      </Container>
    </Section>
  );
};

ToolsPage.getLayout = useDefaultLayout;

export default ToolsPage;
