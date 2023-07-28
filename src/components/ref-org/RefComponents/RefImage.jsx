import Image from 'next/image';
import styled from 'styled-components';

const RefImage = ({ src, alt, width, height, className, style }) => {
  return <StyledImage src={src} alt={alt} width={width} height={height} className={className} style={style} />;
};

const StyledImage = styled(Image)`
  //object-fit: contain;
  //height: unset;
  //max-width: 100%;
`;

export default RefImage;
