import { Flex, Text } from '@near-pagoda/ui';
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { useEffect, useState } from 'react';

import type { NFT } from '@/utils/types';

import { NftImage } from '../NTFImage';

const NFTPreview = ({ nft }: { nft: NFT }) => {
  const [infoNft, setInfoNft] = useState<NFT | undefined>(undefined);
  const { viewFunction } = useWalletSelector();
  useEffect(() => {
    const fetchNftInfo = async () => {
      setInfoNft(
        (await viewFunction({
          contractId: nft.contract_id,
          method: 'nft_token',
          args: { token_id: nft.token_id },
        })) as any,
      );
    };
    fetchNftInfo();
  }, [nft, viewFunction]);

  return (
    <Flex justify="space-between" align="center" style={{ flexDirection: 'column' }}>
      <Text size="text-xl">{infoNft?.metadata?.title}</Text>
      <NftImage nft={infoNft} />
      <Text>{infoNft?.metadata?.description}</Text>
    </Flex>
  );
};

export default NFTPreview;
