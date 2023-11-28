import { StyledContainer, StyledSwiperArrowButton, StyledImagesBox, StyledImages, StyledImage } from './styles';

import { memo, useState } from 'react';

const Swipper = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);
  return (
    <StyledContainer>
      <StyledSwiperArrowButton
        $disabled={current === 0}
        onClick={() => {
          current > 0 && setCurrent(current - 1);
        }}
        style={{ left: '-18px' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
          <path d="M9 1L2 8L9 15" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
        </svg>
      </StyledSwiperArrowButton>
      <StyledImagesBox>
        <StyledImages
          style={{
            width: images.length * 100 + '%',
            transform: `translateX(-${current * (100 / images.length)}%)`,
          }}
        >
          {images.map((img) => (
            <StyledImage key={img} src={img} />
          ))}
        </StyledImages>
      </StyledImagesBox>
      <StyledSwiperArrowButton
        $disabled={current === images.length - 1}
        onClick={() => {
          current < images.length - 1 && setCurrent(current + 1);
        }}
        style={{ right: '-18px' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
          <path d="M1 1L8 8L1 15" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
        </svg>
      </StyledSwiperArrowButton>
    </StyledContainer>
  );
};

export default memo(Swipper);
