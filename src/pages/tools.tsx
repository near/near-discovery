import { Button, Card, Container, Flex, Section, SvgIcon, Tabs, Text } from '@near-pagoda/ui';
import { Coin, Gift, ImagesSquare } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';

import NonFungibleToken from '@/components/tools/NonFungibleToken';
import { NearContext } from '@/components/WalletSelector';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import type { NextPageWithLayout } from '@/utils/types';
import Linkdrops from '@/components/tools/Linkdrops';
import { getKeypomKeys } from '@/utils/keyPair';
import { sign } from 'crypto';

export interface Drops {
  drop_id: string;
  owner_id: string;
  deposit_per_use: string;
  simple: Simple;
  config: null;
  metadata: string;
  registered_uses: number;
  required_gas: string;
  next_key_id: number;
  private_keys?: string[];
}

export interface Simple {
  lazy_register: null;
}

const ToolsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const selectedTab = (router.query.tab as string) || 'ft';
  const { signedAccountId } = useContext(NearContext);
  const [drops, setDrops] = useState<Drops[]>([]);

  const { wallet } = useContext(NearContext);

  useEffect(() => {

    const fetchDropData = async () => {
      if (!wallet || !signedAccountId) return;
      const fetchedDrops: Drops[] = await wallet.viewMethod({
        contractId: "v2.keypom.near",
        method: 'get_drops_for_owner',
        args: { account_id: signedAccountId }
      });
      console.log("fetchedDrops", fetchedDrops);

      const fetchedInformationDrops = fetchedDrops
      .filter(drop => drop.metadata && JSON.parse(drop.metadata).dropName && getKeypomKeys(JSON.parse(drop.metadata).dropName).length)
      .map(
        drop => ({ ...drop, private_keys: getKeypomKeys(JSON.parse(drop.metadata).dropName) })
      );

      setDrops(fetchedInformationDrops)
    };

    fetchDropData();
  }, [wallet, signedAccountId]);

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
                    FT
                  </Tabs.Trigger>

                  <Tabs.Trigger href="?tab=nft" value="nft">
                    <SvgIcon icon={<ImagesSquare fill="bold" />} />
                    NFT
                  </Tabs.Trigger>

                  <Tabs.Trigger href="?tab=linkdrops" value="linkdrops">
                    <SvgIcon icon={<Gift fill="bold" />} />
                    Linkdrops
                  </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="ft">
                  <Text>Coming soon</Text>
                </Tabs.Content>

                <Tabs.Content value="nft">
                  <NonFungibleToken />
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
