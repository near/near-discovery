import { Flex, Text } from '@near-pagoda/ui';
import { useContext, useEffect, useState } from 'react';

import type { NFT } from '@/utils/types';

import { NftImage } from '../NTFImage';
import { NearContext } from '../wallet-selector/WalletSelector';

const NFTPreview = ({ nft }: { nft: NFT }) => {
  const [infoNft, setInfoNft] = useState<NFT | undefined>(undefined);
  const { wallet } = useContext(NearContext);
  useEffect(() => {
    if (!wallet) return;
    const fetchNftInfo = async () => {
      setInfoNft(
        await wallet.viewMethod({
          contractId: nft.contract_id,
          method: 'nft_token',
          args: { token_id: nft.token_id },
        }),
      );
    };
    fetchNftInfo();
  }, [nft, wallet]);

  return (
    <Flex justify="space-between" align="center" style={{ flexDirection: 'column' }}>
      <Text size="text-xl">{infoNft?.metadata?.title}</Text>
      <NftImage nft={infoNft} />
      <Text>{infoNft?.metadata?.description}</Text>
    </Flex>
  );
};

export default NFTPreview;
