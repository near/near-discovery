import { KeyPair } from '@near-js/crypto';
import { formatNearAmount } from '@near-js/utils';
import { Button, Card, Container, Flex, Section, Text } from '@near-pagoda/ui';
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import FTPreview from '@/components/claim/FTPreview';
import NearPreview from '@/components/claim/NearPreview';
import NFTPreview from '@/components/claim/NFTPreview';
import Wallets from '@/components/claim/Wallets';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout, NFT } from '@/utils/types';

export type KeyPairString = `ed25519:${string}` | `secp256k1:${string}`;

type FT = {
  decimals: number;
  icon: string;
  name: string;
  symbol: string;
  total_supply: string;
};

type DropData = {
  token?: FT;
  nft?: NFT;
  amount?: string;
};

const ToolsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { contract_id, key } = router.query;
  const { signedAccountId, signIn, viewFunction } = useWalletSelector();

  const [dropData, setDropData] = useState<DropData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDropData = async () => {
      if (!signedAccountId || !contract_id || !key) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const pk = KeyPair.fromString(key as KeyPairString);
        const dropInformation = (await viewFunction({
          contractId: contract_id as string,
          method: 'get_drop_information',
          args: { key: pk.getPublicKey().toString() },
        })) as any;

        if (dropInformation.ft) {
          const metadata = (await viewFunction({
            contractId: dropInformation.ft.contract_id,
            method: 'ft_metadata',
          })) as any;
          setDropData({
            token: {
              ...metadata,
              total_supply: dropInformation.ft.balance_per_use,
            },
          });
        } else if (dropInformation.nft) {
          const nftId = (await viewFunction({
            contractId: contract_id as string,
            method: 'get_nft_token_ids_for_drop',
            args: { drop_id: dropInformation.drop_id },
          })) as any;
          setDropData({
            nft: {
              contract_id: dropInformation.nft.contract_id,
              token_id: nftId[0],
            },
          });
        } else {
          const balance = (await viewFunction({
            contractId: contract_id as string,
            method: 'get_key_balance',
            args: { key: pk.getPublicKey().toString() },
          })) as any;
          setDropData({ amount: formatNearAmount(balance) });
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch drop data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDropData();
  }, [viewFunction, signedAccountId, contract_id, key]);

  const renderDropContent = () => {
    const { token, nft, amount } = dropData;

    if (token) {
      return <FTPreview token={token} />;
    }

    if (nft) {
      return <NFTPreview nft={nft} />;
    }

    if (amount) {
      return <NearPreview amount={amount} />;
    }

    return null;
  };

  return (
    <Section grow="available" style={{ background: 'var(--sand3)' }}>
      <Container size="s">
        <Flex stack gap="l">
          <Text as="h1" size="text-2xl">
            Claim
          </Text>
          <Card style={{ padding: '2rem' }}>
            {isLoading ? (
              <Text>Loading the drop</Text>
            ) : error ? (
              <Text>Error</Text>
            ) : signedAccountId ? (
              <>
                {renderDropContent()}
                <Wallets url={`${contract_id}/${key}`}></Wallets>
              </>
            ) : (
              <>
                <Text>Please sign in to use wallet utilities</Text>
                <Button label="Sign In" fill="outline" onClick={signIn} />
              </>
            )}
          </Card>
        </Flex>
      </Container>
    </Section>
  );
};

ToolsPage.getLayout = useDefaultLayout;

export default ToolsPage;
