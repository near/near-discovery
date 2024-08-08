import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useVmStore } from '@/stores/vm';

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

const DEFAULT_IMAGE = 'https://ipfs.near.social/ipfs/bafkreidoxgv2w7kmzurdnmflegkthgzaclgwpiccgztpkfdkfzb4265zuu';

export const NftImage: React.FC<NftImageProps> = ({ nft, ipfs_cid, alt }) => {
  const near = useVmStore((store) => store.near);
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE);

  const fetchNftData = useCallback(async () => {
    if (!near || !nft || !nft.contractId || !nft.tokenId || ipfs_cid) return;

    const [nftMetadata, tokenData] = await Promise.all([
      near.viewCall(nft.contractId, 'nft_metadata'),
      near.viewCall(nft.contractId, 'nft_token', { token_id: nft.tokenId }),
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
  }, [near, nft, ipfs_cid]);

  useEffect(() => {
    if (ipfs_cid) {
      setImageUrl(`https://ipfs.near.social/ipfs/${ipfs_cid}`);
    } else {
      fetchNftData();
    }
  }, [ipfs_cid, fetchNftData]);

  return <RoundedImage width={36} height={36} src={imageUrl} alt={alt} />;
};
