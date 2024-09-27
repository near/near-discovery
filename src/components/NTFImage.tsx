import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { NearContext } from './WalletSelector';
import RoundedImage from './RoundedImage';

interface Nft {
  contract_id: string;
  token_id: string;
  media?:string;
  title: string
}

interface NftImageProps {
  nft?: Nft;
}


const getImage = (key: string) => {
  const imgUrl = localStorage.getItem(`keysImage:${key}`);
  return imgUrl || null;
};

const setImage = (key: string, url: string) => {
  localStorage.setItem(`keysImage:${key}`, url);
};

export const NftImage: React.FC<NftImageProps> = ({ nft }) => {
  const { wallet } = useContext(NearContext);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {

    const fetchNftData = async () => {


      if (!wallet || !nft || !nft.contract_id || !nft.token_id ) return;
      
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

  // useEffect(() => {
  //   if (!nft || !nft.token_id) return;
  //   setImage(nft.token_id, imageUrl);
  // }, [nft, imageUrl]);


  return <RoundedImage src={imageUrl} alt={nft?.title || ""} />;
};
