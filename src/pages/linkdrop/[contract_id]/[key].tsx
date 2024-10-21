import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { KeyPair } from 'near-api-js';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import { Button, Card, Container, Flex, Section, Text } from '@near-pagoda/ui';

import { useDefaultLayout } from '@/hooks/useLayout';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { NearContext } from '@/components/wallet-selector/WalletSelector';
import { NftImage } from '@/components/NTFImage';
import { NFT, NextPageWithLayout } from '@/utils/types';

export type KeyPairString = `ed25519:${string}` | `secp256k1:${string}`;

type FT = {
  decimals: number;
  icon: string;
  name: string;
  symbol: string;
  total_supply: string;
}

const ToolsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { contract_id, key } = router.query;
  const { signedAccountId, wallet } = useContext(NearContext);
  const { requestAuthentication } = useSignInRedirect();
  
  const [dropData, setDropData] = useState<{
    token?: FT;
    nft?: NFT;
    amount?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDropData = async () => {
      if (!wallet || !signedAccountId || !contract_id || !key) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const pk = KeyPair.fromString(key as KeyPairString);
        const dropInformation = await wallet.viewMethod({
          contractId: contract_id as string,
          method: 'get_drop_information',
          args: { key: pk.getPublicKey().toString() },
        });

        if (dropInformation.ft) {
          const metadata = await wallet.viewMethod({ 
            contractId: dropInformation.ft.contract_id, 
            method: 'ft_metadata' 
          });
          setDropData({ 
            token: { 
              ...metadata, 
              total_supply: dropInformation.ft.balance_per_use 
            } 
          });
        } else if (dropInformation.nft) {
          const nftId = await wallet.viewMethod({
            contractId: contract_id as string,
            method: 'get_nft_token_ids_for_drop',
            args: { drop_id: dropInformation.drop_id },
          });
          setDropData({ 
            nft: { 
              contract_id: dropInformation.nft.contract_id, 
              token_id: nftId[0] 
            } 
          });
        } else {
          const balance = await wallet.viewMethod({
            contractId: contract_id as string,
            method: 'get_key_balance',
            args: { key: pk.getPublicKey().toString() },
          });
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
  }, [wallet, signedAccountId, contract_id, key]);

  const handleClaim = async () => {
    // Implement claim logic here
    console.log('Claim button clicked');
  };

  const renderDropContent = () => {
    const { token, nft, amount } = dropData;

    if (token) {
      return (
        <Flex justify="space-between" align="center">
          <Text>{token.name}</Text>
          <Text>{token.symbol}</Text>
          <Text>
            {(BigInt(token.total_supply) / BigInt(10 ** token.decimals)).toString()}
          </Text>
          <Image src={token.icon} alt={token.name} width={50} height={50} />
        </Flex>
      );
    }

    if (nft) {
      return <NftImage nft={nft} />;
    }

    if (amount) {
      return <Text>{amount} NEAR</Text>;
    }

    return null;
  };

  return (
    <Section grow="available" style={{ background: 'var(--sand3)' }}>
      <Container size="s">
        <Flex stack gap="l">
          <Text as="h1" size="text-2xl">
            Claims
          </Text>
          {isLoading ? (
            <Text>Loading the drop</Text>
          ) : error ? (
            <Text>Error</Text>
          ) : signedAccountId ? (
            <Card>
              {renderDropContent()}
              <Button 
                label="Claim 😈" 
                fill="outline" 
                onClick={handleClaim}
                disabled={isLoading}
              />
            </Card>
          ) : (
            <Card>
              <Text>Please sign in to use wallet utilities</Text>
              <Button 
                label="Sign In" 
                fill="outline" 
                onClick={() => requestAuthentication()} 
              />
            </Card>
          )}
        </Flex>
      </Container>
    </Section>
  );
};

ToolsPage.getLayout = useDefaultLayout;

export default ToolsPage;