import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const Img = styled.img`
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
`;

export const DEFAULT_IMAGE =
  'https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm';

const RoundedImage = ({ src, alt }: { src: string; alt: string }) => {
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE);
  useEffect(() => {
    setImageUrl(src);
  }, [src]);

  return <Img height={43} width={43} src={imageUrl} alt={alt || ''} onError={() => setImageUrl(DEFAULT_IMAGE)} />;
};

export default RoundedImage;
