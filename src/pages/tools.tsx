import { Button, Card, Container, Flex, Section, SvgIcon, Tabs, Text } from '@near-pagoda/ui';
import { Coin, Gift, ImagesSquare } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import NonFungibleToken from '@/components/tools/NonFungibleToken';
import { NearContext } from '@/components/WalletSelector';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import type { NextPageWithLayout } from '@/utils/types';
import Linkdrops from '@/components/tools/Linkdrops';

const ToolsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const selectedTab = (router.query.tab as string) || 'ft';
  const { signedAccountId } = useContext(NearContext);

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
                  <Linkdrops/>
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
