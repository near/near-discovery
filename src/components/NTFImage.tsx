import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { useEffect, useState } from 'react';

import type { NFT } from '@/utils/types';

import RoundedImage from './RoundedImage';

interface NftImageProps {
  nft?: NFT;
}

export const NftImage: React.FC<NftImageProps> = ({ nft }) => {
  const { wallet } = useWalletSelector();
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchNftData = async () => {
      if (!wallet || !nft || !nft.token_id) return;

      const tokenMedia = nft.metadata?.media || '';

      if (tokenMedia.startsWith('https://') || tokenMedia.startsWith('http://')) {
        setImageUrl(tokenMedia);
      } else if (tokenMedia.startsWith('data:image')) {
        setImageUrl(tokenMedia);
      } else if (nft.metadata?.base_uri) {
        setImageUrl(`${nft.metadata.base_uri}/${tokenMedia}`);
      } else if (tokenMedia.startsWith('Qm') || tokenMedia.startsWith('ba')) {
        setImageUrl(`https://ipfs.near.social/ipfs/${tokenMedia}`);
      }
    };

    fetchNftData();
  }, [nft, imageUrl, wallet]);

  return <RoundedImage src={imageUrl} alt={nft?.metadata?.title || ''} />;
};
