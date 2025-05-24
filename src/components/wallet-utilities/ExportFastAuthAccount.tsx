import { KeyPair } from '@near-js/crypto';
import {
  Accordion,
  Button,
  Card,
  copyTextToClipboard,
  Flex,
  handleClientError,
  HR,
  openToast,
  Text,
  Tooltip,
} from '@near-pagoda/ui';
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { Copy, Eye, EyeSlash } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

export const ExportFastAuthAccount = () => {
  const [generatingKey, setGeneratingKey] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [fastAuthAccountSignedIn, setFastAuthAccountSignedIn] = useState(false);
  const [privateKeyVisible, setPrivateKeyVisible] = useState(false);
  const [enoughBalance, setEnoughBalance] = useState(false);
  const { getBalance, getAccessKeys, signedAccountId, walletSelector, signAndSendTransactions } = useWalletSelector();

  useEffect(() => {
    const balanceCheck = async () => {
      if (!signedAccountId) return;

      const balance = await getBalance(signedAccountId);
      setEnoughBalance(balance >= 0.001);
    };

    balanceCheck();
  }, [getBalance, signedAccountId]);

  useEffect(() => {
    const checkFastAuthAccount = async () => {
      const selector = await walletSelector;
      const selectedWallet: any = await selector?.wallet();

      if (selectedWallet?.signAndSendDelegateAction) {
        setFastAuthAccountSignedIn(true);
      }
    };

    if (!signedAccountId) return;
    checkFastAuthAccount();
  }, [signedAccountId, walletSelector]);

  const generateKey = async () => {
    try {
      if (!signedAccountId) return;

      setGeneratingKey(true);

      const keyPair = KeyPair.fromRandom('ed25519');
      const publicKey = keyPair.getPublicKey().toString();
      const addKeyTransaction = {
        receiverId: signedAccountId,
        signerId: signedAccountId,
        actions: [
          {
            type: 'AddKey',
            params: {
              publicKey: publicKey,
              accessKey: {
                permission: 'FullAccess',
              },
            },
          },
        ],
      } as any;

      await signAndSendTransactions({ transactions: [addKeyTransaction] });

      openToast({
        type: 'info',
        title: 'Checking for key',
        description: 'We are checking if the key was added to your account, this can take up to 10 seconds',
        duration: 5000,
      });

      let hasKey = false;

      for (let i = 0; i < 5; i++) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const accessKeys = await getAccessKeys(signedAccountId);
        hasKey = accessKeys.some((key: any) => key.public_key === publicKey);
        if (hasKey) break;
      }

      if (!hasKey) throw new Error('Failed to add access key');

      setSecretKey(keyPair.toString());

      openToast({
        type: 'success',
        title: 'Key Generated',
        description: 'Copy the key and continue to the next step',
      });
    } catch (error) {
      handleClientError({ error, title: 'Failed to create full access key' });
    } finally {
      setGeneratingKey(false);
    }
  };

  if (!fastAuthAccountSignedIn) {
    return <Text>This tool allows to export accounts created with an email (also known as FastAuth accounts)</Text>;
  }

  return (
    <Flex stack gap="l">
      <Text color="sand12" weight={500}>
        Want to export your FastAuth account to a wallet? Follow the steps below:
      </Text>

      <HR style={{ margin: 0 }} />

      <Text size="text-l">1. Generate Key</Text>

      <Text size="text-s">
        Click the button below to create a full access key. Once {`you've`} reviewed and confirmed the transaction,{' '}
        {`you'll`} be able to copy the generated key to your clipboard.
      </Text>

      {secretKey ? (
        <Card>
          <Flex stack>
            <Flex align="center">
              <Text size="text-s" weight={600} style={{ marginRight: 'auto' }}>
                Your Generated Key
              </Text>

              <Tooltip content={privateKeyVisible ? 'Hide' : 'Show'}>
                <Button
                  label={privateKeyVisible ? 'Hide Key' : 'Show Key'}
                  icon={privateKeyVisible ? <Eye /> : <EyeSlash />}
                  fill="outline"
                  size="small"
                  onClick={() => setPrivateKeyVisible((prev) => !prev)}
                />
              </Tooltip>

              <Tooltip content="Copy Key">
                <Button
                  label="Copy Key"
                  icon={<Copy />}
                  fill="outline"
                  size="small"
                  onClick={() => copyTextToClipboard(secretKey, 'Access key copied to clipboard')}
                />
              </Tooltip>
            </Flex>

            <Text
              size="text-xs"
              style={{
                fontFamily: 'monospace',
                filter: privateKeyVisible ? 'none' : 'blur(4px)',
                userSelect: privateKeyVisible ? 'unset' : 'none',
              }}
              color="sand12"
            >
              {secretKey}
            </Text>

            <HR style={{ margin: 0 }} />

            <Text size="text-xs" color="amber11">
              This private key is highly sensitive like a password. Keep it secure and do not share it with anyone.
            </Text>
          </Flex>
        </Card>
      ) : (
        <Button
          disabled={!signedAccountId || !enoughBalance}
          loading={generatingKey}
          onClick={generateKey}
          label={enoughBalance ? 'Create Full Access Key' : 'Not enough balance (0.001 Ⓝ required)'}
          variant="affirmative"
        />
      )}

      <HR style={{ margin: 0 }} />

      <Text size="text-l">2. Import Key</Text>

      <Text size="text-s">
        Copy the key that you generated above and paste it into the import flow of your preferred wallet:
      </Text>

      <Accordion.Root type="multiple">
        <Accordion.Item value="bitte-wallet">
          <Accordion.Trigger>Bitte Wallet</Accordion.Trigger>
          <Accordion.Content>
            <ol>
              <li>
                <Text size="text-s">
                  Open their{' '}
                  <a href="https://wallet.bitte.ai/account/connect" target="_blank">
                    Connect Account
                  </a>{' '}
                  page
                </Text>
              </li>
              <li>
                <Text size="text-s">
                  Scroll down to the <b>Import</b> section and select <b>Private Key</b>
                </Text>
              </li>
              <li>
                <Text size="text-s">Paste the key copied from above</Text>
              </li>
            </ol>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="here-wallet">
          <Accordion.Trigger>HERE Wallet</Accordion.Trigger>
          <Accordion.Content>
            <ol>
              <li>
                <Text size="text-s">
                  Install the{' '}
                  <a href="https://www.herewallet.app/" target="_blank">
                    HERE Wallet
                  </a>{' '}
                  app on your device
                </Text>
              </li>
              <li>
                <Text size="text-s">
                  Open up the app and navigate to the <b>Import Account</b> page
                </Text>
              </li>
              <li>
                <Text size="text-s">
                  Scroll down to click the <b>Use Private Key</b> button
                </Text>
              </li>
              <li>
                <Text size="text-s">Paste the key copied from above</Text>
              </li>
            </ol>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="meteor-wallet">
          <Accordion.Trigger>Meteor Wallet</Accordion.Trigger>
          <Accordion.Content>
            <ol>
              <li>
                <Text size="text-s">
                  Open their{' '}
                  <a href="https://wallet.meteorwallet.app/add_wallet/import_wallet" target="_blank">
                    Import Wallet
                  </a>{' '}
                  page
                </Text>
              </li>
              <li>
                <Text size="text-s">
                  Select the <b>Private Key</b> method and click <b>Continue</b>
                </Text>
              </li>
              <li>
                <Text size="text-s">Paste the key copied from above</Text>
              </li>
            </ol>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="my-near-wallet">
          <Accordion.Trigger>My Near Wallet</Accordion.Trigger>
          <Accordion.Content>
            <ol>
              <li>
                <Text size="text-s">
                  Open their{' '}
                  <a href="https://app.mynearwallet.com/recover-private-key" target="_blank">
                    Recover Private Key
                  </a>{' '}
                  page
                </Text>
              </li>
              <li>
                <Text size="text-s">Paste the key copied from above</Text>
              </li>
            </ol>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </Flex>
  );
};
