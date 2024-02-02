import { useRouter } from 'next/router';
import { memo, useState } from 'react';

import { StyledContainer, StyledImage, StyledImages, StyledImagesBox, StyledSwiperArrowButton } from './styles';

const Swipper = ({ banners, bp }: { banners: { banner: string; link: string }[]; bp?: string }) => {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
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
          <path d="M9 1L2 8L9 15" stroke="#979ABE" stroke-width="2" strokeLinecap="round" />
        </svg>
      </StyledSwiperArrowButton>
      <StyledImagesBox>
        <StyledImages
          style={{
            width: banners.length * 100 + '%',
            transform: `translateX(-${current * (100 / banners.length)}%)`,
          }}
        >
          {banners.map((banner) => (
            <StyledImage
              key={banner.banner}
              src={banner.banner}
              onClick={() => {
                if (!banner.link) return;
                if (banner.link.includes('http')) {
                  window.open(banner.link, '_blank');
                  return;
                }
                router.push(banner.link);
              }}
              data-bp={bp}
            />
          ))}
        </StyledImages>
      </StyledImagesBox>
      <StyledSwiperArrowButton
        $disabled={current === banners.length - 1}
        onClick={() => {
          current < banners.length - 1 && setCurrent(current + 1);
        }}
        style={{ right: '-18px' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
          <path d="M1 1L8 8L1 15" stroke="#979ABE" stroke-width="2" strokeLinecap="round" />
        </svg>
      </StyledSwiperArrowButton>
    </StyledContainer>
  );
};

export default memo(Swipper);
