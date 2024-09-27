import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const Img = styled(Image)`
  border-radius: 50%;
`;

export const DEFAULT_IMAGE = 'https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm';

const RoundedImage = ({src,alt}:{src:string,alt:string})=> {
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE);
  useEffect(() => {
    setImageUrl(src);
  },[src])
  
  return <Img width={43} height={43} src={imageUrl} alt={alt || ""} onError={() => setImageUrl(DEFAULT_IMAGE) } />;

}

export default RoundedImage;