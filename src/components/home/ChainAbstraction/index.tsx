import { Flex, Grid, Text } from '@near-pagoda/ui';
import { BookOpenText, GasPump, Signature, UserCheck } from '@phosphor-icons/react';

import useDeviceType from '@/hooks/useDeviceType';

import { Button } from '../Button';

export const ChainAbstraction = () => {
  const deviceType = useDeviceType();

  return (
    <Flex
      stack
      gap="l"
      gapPhone="xl"
      gapTablet="xl"
      justify='space-between'
      style={{ padding: '0.5rem', flex: "auto" }}
    >
      <Grid
        columns="542px minmax(0, 1fr)"
        gap="2xl"
        gapPhone="m"
        gapTablet="m"
        columnsTablet="minmax(0, 1fr)"
        columnsPhone="minmax(0, 1fr)"
      >
        <Flex stack gap="m">
          <Text as="h1" style={{ fontWeight: 'normal' }}>
            The Account Model Built for Abstraction
          </Text>
          <Text size="text-l" style={{ fontWeight: 'lighter' }}>
            Built-in named accounts, a rich key system, and contracts that are wallets
          </Text>
        </Flex>
        <Flex stack gap="m" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <UserCheck fill="var(--green11)" size="s" style={{ height: '95px' }} />
          <Button
            iconLeft={<BookOpenText fill="bold" />}
            href="/documentation/concepts/protocol/account-model"
            label="Read on Account Model"
          />
        </Flex>
      </Grid>

      <Grid
        columns="minmax(0, 1fr) 542px"
        gap="2xl"
        gapPhone="m"
        gapTablet="m"
        columnsTablet="minmax(0, 1fr)"
        columnsPhone="minmax(0, 1fr)"
        style={{ margin: deviceType != 'desktop' ? '24px 0' : '0' }}
      >
        <Flex stack gap="m" style={{ justifyContent: 'center', gridRowEnd: deviceType == 'desktop' ? 'auto' : '3' }}>
          <GasPump fill="var(--red9)" size="s" style={{ height: '95px' }} />
          <Button
            iconLeft={<BookOpenText fill="bold" />}
            href="/documentation/concepts/abstraction/relayers"
            label="Discover Gas Relayers"
          />
        </Flex>
        <Flex stack gap="m" justify="space-between">
          <Text as="h1" style={{ fontWeight: 'normal' }}>
            Easily Cover your Users&apos; Transactions
          </Text>
          <Text size="text-l" style={{ fontWeight: 'lighter' }}>
            Built-in meta-transactions enable your users to enjoy your application, without handling funds
          </Text>
        </Flex>
      </Grid>

      <Grid
        columns="542px minmax(0, 1fr)"
        gap="2xl"
        gapPhone="m"
        gapTablet="m"
        columnsTablet="minmax(0, 1fr)"
        columnsPhone="minmax(0, 1fr)"
      >
        <Flex stack gap="m" style={{ textAlign: 'left' }}>
          <Text as="h1" style={{ fontWeight: 'normal' }}>
            {' '}
            Control Accounts Across Multiple Chains{' '}
          </Text>
          <Text size="text-l" style={{ fontWeight: 'lighter' }}>
            Near accounts can sign transactions for chains like Ethereum, Bitcoin or Doge
          </Text>
        </Flex>
        <Flex stack gap="m" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <Signature fill="var(--violet8)" size="s" style={{ height: '95px' }} />

          <Button
            iconLeft={<BookOpenText fill="bold" />}
            href="/documentation/build/chain-abstraction/chain-signatures/getting-started"
            label="Discover Chain Signatures"
          />
        </Flex>
      </Grid>
    </Flex>
  );
};
