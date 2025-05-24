import { Account } from '@near-js/accounts';
import { JsonRpcProvider } from '@near-js/providers';
import { KeyPairSigner } from '@near-js/signers';
import { Button, Card, Container, Flex, Form, Input, Section, Text } from '@near-pagoda/ui';
import { Clock } from '@phosphor-icons/react';
import { useState } from 'react';

import { networks } from '@/config';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

async function createAndDeleteTmpAcc(accountId: string) {
  // yes, we are hardcoding a private key here, but it will be used to
  // create and delete a testnet account in the background, so no worries

  const tmpAccount = `${accountId.replace('.', '-')}-${Date.now()}.testnet`;
  const signer = KeyPairSigner.fromSecretKey(
    'ed25519:5mixhRL3GcXL9sXx9B4juv6cp3Js4Qo7qY9gWs8bzcQGeSbefXMkCJh5UpmwZYriitMjsppqV4W8zb5bREkYRxLh',
  );
  const publicKey = await signer.getPublicKey();
  await fetch('https://helper.testnet.near.org/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newAccountId: tmpAccount,
      newAccountPublicKey: publicKey.toString(),
    }),
  });

  // wait 1 second for the account to be created
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const provider = new JsonRpcProvider({ url: networks.testnet.nodeUrl });
  const account = new Account(tmpAccount, provider, signer);
  return account.deleteAccount(accountId);
}

const ToolsPage: NextPageWithLayout = () => {
  const [error, setError] = useState<string | undefined>();
  const [label, setLabel] = useState('Request');

  const requestFaucet = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const accountId = formData.get('accountId') as string;

    if (!accountId) {
      setError('Please enter a valid account ID');
      return;
    }

    setLabel('Requesting');
    setError(undefined);

    createAndDeleteTmpAcc(accountId)
      .then(() => {
        setLabel('Funded!');
      })
      .catch((err) => {
        setError(err.message || 'An error occurred while requesting the faucet');
        setLabel('Request');
      });
  };

  return (
    <Section grow="available" style={{ background: 'var(--sand3)' }}>
      <Container size="s" style={{ display: 'flex', justifyContent: 'center' }}>
        <Flex stack gap="l">
          <Text as="h1" size="text-2xl">
            NEAR Testnet Faucet
          </Text>

          <Text size="text-base">Request testnet NEAR tokens to test your applications</Text>

          <Card>
            <Form onSubmit={requestFaucet}>
              <Flex stack gap="m">
                <Input
                  name="accountId"
                  required
                  error={error}
                  success={label === 'Funded!' ? 'Account funded!' : undefined}
                  label="Testnet Account ID"
                  placeholder="account.testnet  |  0x123...  |  implicit address"
                />
                <Button
                  label={label}
                  iconLeft={label == 'Requesting' ? <Clock /> : undefined}
                  variant={label != 'Funded!' ? 'primary' : 'affirmative'}
                  type="submit"
                  disabled={label !== 'Request'}
                />
              </Flex>
            </Form>
          </Card>
        </Flex>
      </Container>
    </Section>
  );
};

ToolsPage.getLayout = useDefaultLayout;

export default ToolsPage;
