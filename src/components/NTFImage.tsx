import { useEffect, useState } from 'react';
import { useContext } from 'react';

import RoundedImage from './RoundedImage';
import { NearContext } from './WalletSelector';
import { NFT } from '@/utils/types';


interface NftImageProps {
  nft?: NFT;
}

const getImage = (key: string) => {
  const imgUrl = localStorage.getItem(`keysImage:${key}`);
  return imgUrl || null;
};

const setImage = (key: string, url: string) => {
  localStorage.setItem(`keysImage:${key}`, url);
};

export const NftImage: React.FC<NftImageProps> = ({ nft }) => {
  console.log(nft);
  
  const { wallet } = useContext(NearContext);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchNftData = async () => {
      if (!wallet || !nft || !nft.contract_id || !nft.token_id) return;


      // const imgCache = getImage(nft.tokenId);
      // if (imgCache) {
      //   setImageUrl(imgCache);
      //   return;
      // }
      const [nftMetadata, tokenData] = await Promise.all([
        wallet.viewMethod({ contractId: nft.contract_id, method: 'nft_metadata' }),
        wallet.viewMethod({ contractId: nft.contract_id, method: 'nft_token', args: { token_id: nft.token_id } }),
      ]);

      const tokenMedia = tokenData?.metadata?.media || '';

      if (tokenMedia.startsWith('https://') || tokenMedia.startsWith('http://')) {

        if (!tokenMedia.includes('ipfs.near.social')) {
          console.log("pre image", tokenMedia);
          
          const url = new URL(tokenMedia);
          url.hostname = 'ipfs.near.social';
          console.log("post image", url.toString());
          setImageUrl(url.toString());
        } else {
          setImageUrl(tokenMedia);
        }
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

  // useEffect(() => {
  //   if (!nft || !nft.token_id) return;
  //   setImage(nft.token_id, imageUrl);
  // }, [nft, imageUrl]);

  return <RoundedImage src={imageUrl} alt={nft?.metadata?.title || ''} />;
};
