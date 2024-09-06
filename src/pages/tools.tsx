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

export interface Drops {
  drop_id:         string;
  owner_id:        string;
  deposit_per_use: string;
  simple:          Simple;
  config:          null;
  metadata:        string;
  registered_uses: number;
  required_gas:    string;
  next_key_id:     number;
  information:     Information[];
}

export interface Information {
  drop_id:        string;
  pk:             string;
  cur_key_use:    number;
  remaining_uses: number;
  last_used:      number;
  allowance:      number;
  key_id:         number;
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

  const fetchDropData = useCallback(async () => {
    if (!wallet) return;
    const fetchedDrops: Drops[] = await wallet.viewMethod({ 
      contractId: "v2.keypom.near", 
      method: 'get_drops_for_owner',
      args: { account_id: "maguila.near" }
    });
    console.log("fetchedDrops",fetchedDrops);
    
    const fetchedInfomationDrops=await Promise.all(fetchedDrops.map(async (drop) => {
      const information = await wallet.viewMethod({
        contractId: "v2.keypom.near",
        method: 'get_keys_for_drop',
        args: { drop_id: drop.drop_id }
      });
      return { ...drop, information };
    }));
    setDrops(fetchedInfomationDrops)
  }, [wallet]);

  useEffect(() => {
    fetchDropData();
  }, [fetchDropData]);
  console.log("drops",drops);
  
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
                  <Linkdrops drops={drops}/>
                </Tabs.Content>
              </Tabs.Root>
            </Card>
          ) : (
            <Card>
              <Text>Please sign in to use wallet utilities.</Text>
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
