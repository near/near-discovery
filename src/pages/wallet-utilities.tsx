import { Button, Card, Container, Flex, Section, SvgIcon, Tabs } from '@near-pagoda/ui';
import { Text } from '@near-pagoda/ui';
import { HandCoins, LockKeyOpen, PaperPlaneTilt } from '@phosphor-icons/react';
import { useRouter } from 'next/router';

import { ReceiveNear } from '@/components/wallet-utilities/ReceiveNear';
import { SendNear } from '@/components/wallet-utilities/SendNear';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { useAuthStore } from '@/stores/auth';
import type { NextPageWithLayout } from '@/utils/types';

const WalletUtilitiesPage: NextPageWithLayout = () => {
  const router = useRouter();
  const selectedTab = (router.query.tab as string) || 'send';
  const signedIn = useAuthStore((store) => store.signedIn);
  const { requestAuthentication } = useSignInRedirect();

  return (
    <Section grow="available" style={{ background: 'var(--sand3)' }}>
      <Container size="s">
        <Flex stack gap="m">
          <Text as="h1" size="text-2xl">
            Wallet Utilities
          </Text>

          {signedIn ? (
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

                  <Tabs.Trigger href="?tab=export-key" value="export-key">
                    <SvgIcon icon={<LockKeyOpen fill="bold" />} />
                    Export Key
                  </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="send">
                  <SendNear />
                </Tabs.Content>

                <Tabs.Content value="receive">
                  <ReceiveNear />
                </Tabs.Content>

                <Tabs.Content value="export-key">
                  <Text>Export....</Text>
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
