import { useEffect, useState } from 'react';
import { useContext } from 'react';

import type { NFT } from '@/utils/types';

import RoundedImage from './RoundedImage';
import { NearContext } from './wallet-selector/WalletSelector';

interface NftImageProps {
  nft?: NFT;
}

export const NftImage: React.FC<NftImageProps> = ({ nft }) => {
  const { wallet } = useContext(NearContext);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchNftData = async () => {
      if (!wallet || !nft || !nft.token_id) return;

      const tokenMedia = nft.metadata?.media || '';
      console.log('tokenMedia', tokenMedia);
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
