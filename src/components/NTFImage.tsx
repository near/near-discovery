import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';

import { NearContext } from './WalletSelector';

export const RoundedImage = styled(Image)`
  border-radius: 50%;
`;

interface Nft {
  contractId: string;
  tokenId: string;
}

interface NftImageProps {
  nft?: Nft;
  ipfs_cid?: string;
  alt: string;
  src?: string;
}

export const DEFAULT_IMAGE = 'https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm';

const getImage = (key: string) => {
  const imgUrl = localStorage.getItem(`keysImage:${key}`);
  return imgUrl || null;
};

const setImage = (key: string, url: string) => {
  localStorage.setItem(`keysImage:${key}`, url);
};

export const NftImage: React.FC<NftImageProps> = ({ nft, alt }) => {
  const { wallet } = useContext(NearContext);
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE);

  useEffect(() => {

    const fetchNftData = async () => {
      console.log(nft);

      if (!wallet || !nft || !nft.contract_id || !nft.token_id) return;
      console.log(nft);
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
        console.log("tokenMedia", tokenMedia);

        if (!tokenMedia.includes('ipfs.near.social')) {
          const url = new URL(tokenMedia);
          url.hostname = 'ipfs.near.social';
          setImageUrl(url.toString())
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

  useEffect(() => {
    if (!nft || !nft.tokenId) return;
    setImage(nft.tokenId, imageUrl);
  }, [nft, imageUrl]);


  return <RoundedImage width={43} height={43} src={imageUrl} alt={alt} onError={() => { setImageUrl(DEFAULT_IMAGE) }} />;
};
