import { Button, Card, Container, Flex, Section, SvgIcon, Tabs } from '@near-pagoda/ui';
import { Text } from '@near-pagoda/ui';
import { HandCoins, Key, LockKeyOpen, PaperPlaneTilt } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { ExportFastAuthAccount } from '@/components/wallet-utilities/ExportFastAuthAccount';
import KeyTable from '@/components/wallet-utilities/KeyTable';
import { ReceiveNear } from '@/components/wallet-utilities/ReceiveNear';
import { SendNear } from '@/components/wallet-utilities/SendNear';
import { NearContext } from '@/components/WalletSelector';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import type { NextPageWithLayout } from '@/utils/types';

const WalletUtilitiesPage: NextPageWithLayout = () => {
  const router = useRouter();
  const selectedTab = (router.query.tab as string) || 'send';
  const signedAccountId = useContext(NearContext);
  const { requestAuthentication } = useSignInRedirect();

  return (
    <Section grow="available" style={{ background: 'var(--sand3)' }}>
      <Container size="s">
        <Flex stack gap="l">
          <Text as="h1" size="text-2xl">
            Wallet Utilities
          </Text>

          {signedAccountId ? (
            <Card style={{ paddingTop: 0 }}>
              <Tabs.Root value={selectedTab}>
                <Tabs.List style={{ marginBottom: 'var(--gap-m)' }}>
                  <Tabs.Trigger href="?tab=send" value="send">
                    <SvgIcon icon={<PaperPlaneTilt fill="bold" />} />
                    Send
                  </Tabs.Trigger>

                  <Tabs.Trigger href="?tab=receive" value="receive">
                    <SvgIcon icon={<HandCoins fill="bold" />} />
                    Receive
                  </Tabs.Trigger>

                  <Tabs.Trigger href="?tab=export" value="export">
                    <SvgIcon icon={<LockKeyOpen fill="bold" />} />
                    Export Account
                  </Tabs.Trigger>

                  <Tabs.Trigger href="?tab=key" value="key">
                    <SvgIcon icon={<Key fill="bold" />} />
                    Apps
                  </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="send">
                  <SendNear />
                </Tabs.Content>

                <Tabs.Content value="receive">
                  <ReceiveNear />
                </Tabs.Content>

                <Tabs.Content value="export">
                  <ExportFastAuthAccount />
                </Tabs.Content>

                <Tabs.Content value="key">
                  <KeyTable />
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

WalletUtilitiesPage.getLayout = useDefaultLayout;

export default WalletUtilitiesPage;
