import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';

import { NearContext } from './WalletSelector';

const RoundedImage = styled(Image)`
  border-radius: 50%;
`;

interface Nft {
  contractId: string;
  tokenId: string;
}

interface NftImageProps {
  nft: Nft;
  ipfs_cid?: string;
  alt: string;
}

const DEFAULT_IMAGE = 'https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm';

export const NftImage: React.FC<NftImageProps> = ({ nft, ipfs_cid, alt }) => {
  const { wallet } = useContext(NearContext);
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE);

  const fetchNftData = useCallback(async () => {
    if (!wallet || !nft || !nft.contractId || !nft.tokenId || ipfs_cid) return;

    const [nftMetadata, tokenData] = await Promise.all([
      wallet.viewMethod({ contractId: nft.contractId, method: 'nft_metadata' }),
      wallet.viewMethod({ contractId: nft.contractId, method: 'nft_token', args: { token_id: nft.tokenId } }),
    ]);

    const tokenMetadata = tokenData.metadata;
    const tokenMedia = tokenMetadata?.media || '';

    if (tokenMedia.startsWith('https://') || tokenMedia.startsWith('http://') || tokenMedia.startsWith('data:image')) {
      setImageUrl(tokenMedia);
    } else if (nftMetadata?.base_uri) {
      setImageUrl(`${nftMetadata.base_uri}/${tokenMedia}`);
    } else if (tokenMedia.startsWith('Qm') || tokenMedia.startsWith('ba')) {
      setImageUrl(`https://ipfs.near.social/ipfs/${tokenMedia}`);
    }
  }, [wallet, nft, ipfs_cid]);

  useEffect(() => {
    if (ipfs_cid) {
      setImageUrl(`https://ipfs.near.social/ipfs/${ipfs_cid}`);
    } else {
      fetchNftData();
    }
  }, [ipfs_cid, fetchNftData]);

  return <RoundedImage width={43} height={43} src={imageUrl} alt={alt} />;
};
