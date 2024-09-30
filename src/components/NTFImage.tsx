import { useEffect, useState } from 'react';
import { useContext } from 'react';

import RoundedImage from './RoundedImage';
import { NearContext } from './WalletSelector';
import { NFT } from '@/utils/types';


interface NftImageProps {
  nft?: NFT;
}

const getImage = (contract: string, id: string,) => {
  return localStorage.getItem(`keysImage:${contract}-${id}`);
};

const setImage = (contract: string, id: string, url: string) => {
  localStorage.setItem(`keysImage:${contract}-${id}`, url);
};

export const NftImage: React.FC<NftImageProps> = ({ nft }) => {
  console.log(nft);

  const { wallet } = useContext(NearContext);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchNftData = async () => {
      if (!wallet || !nft || !nft.contract_id || !nft.token_id) return;

      const imgCache = getImage(nft.contract_id, nft.token_id);
      if (imgCache) {
        setImageUrl(imgCache);
        return;
      }

      const [nftMetadata, tokenData] = await Promise.all([
        wallet.viewMethod({ contractId: nft.contract_id, method: 'nft_metadata' }),
        wallet.viewMethod({ contractId: nft.contract_id, method: 'nft_token', args: { token_id: nft.token_id } }),
      ]);

      const tokenMedia = tokenData?.metadata?.media || '';

      if (tokenMedia.startsWith('https://') || tokenMedia.startsWith('http://')) {
        setImageUrl(tokenMedia);
      } else if (tokenMedia.startsWith('data:image')) {
        setImageUrl(tokenMedia);
      } else if (nftMetadata?.base_uri) {
        setImageUrl(`${nftMetadata.base_uri}/${tokenMedia}`);
      } else if (tokenMedia.startsWith('Qm') || tokenMedia.startsWith('ba')) {
        setImageUrl(`https://ipfs.near.social/ipfs/${tokenMedia}`);
      }
    };

    fetchNftData();
  }, []);

  useEffect(() => {
    if (!nft || !nft.token_id) return;
    setImage(nft.contract_id, nft.token_id, imageUrl);
  }, [nft, imageUrl]);

  return <RoundedImage src={imageUrl} alt={nft?.metadata?.title || ''} />;
};
