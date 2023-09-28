import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import icon from '@/assets/images/nearcon_banner_2023.svg';
import { Button } from '@/components/lib/Button';
import { useBanner } from '@/hooks/useBanner';
import { useCurrentComponentStore } from '@/stores/current-component';

type Props = {
  inline?: boolean;
};

type FlexProps = {
  gap?: string;
  alignItems?: string;
  justifyContent?: string;
  direction?: string;
  wrap?: string;
};

const Wrapper = styled.div<{
  inline?: boolean;
}>`
  background: #00ec97;
  border-radius: ${(p) => (p.inline ? '5px' : 0)};

  .banner-button {
    font-size: 14px;

    &.desktop-button {
      @media (max-width: 380px) {
        display: none !important;
      }
    }
    &.mobile-button {
      display: none;
      @media (max-width: 380px) {
        display: inline !important;
      }
    }
  }
  .close-button {
    all: unset;
    width: 14px;
    height: 14px;
    line-height: 14px;
    color: #664d04;
    background: transparent;
    outline: none;
    border: none;
    transition: color 0.2s;
    cursor: pointer;

    &:hover {
      border: none;
      background: transparent;
    }
  }
`;

const Flex = styled.div<FlexProps>`
  display: flex;
  gap: ${(p) => p.gap};
  align-items: ${(p) => p.alignItems};
  justify-content: ${(p) => p.justifyContent};
  flex-direction: ${(p) => p.direction ?? 'row'};
  flex-wrap: ${(p) => p.wrap ?? 'nowrap'};

  @media (max-width: 576px) {
    gap: 10px;
  }
`;

export const NearconBanner = (props: Props) => {
  const [isBannerVisible, setBanners] = useBanner();
  const componentSrc = useCurrentComponentStore();
  const isNearconWidget = componentSrc && componentSrc.src?.includes('nearcon23.near/widget/Index');

  const closeBanner = () => {
    setBanners(!isBannerVisible);
  };

  if (!isBannerVisible || isNearconWidget) return null;

  return (
    <Wrapper inline={props.inline}>
      <Flex gap="24px" alignItems="center" justifyContent="center">
        <Image src={icon} alt="nearcon-banner" />
        <Link href="http://nearcon.org" target="_blank" className="banner-button desktop-button">
          <Button
            label="Get your tickets"
            iconRight="ph-bold ph-arrow-right"
            variant="primary"
            fill="outline"
            size="small"
          />
        </Link>
        <Link href="http://nearcon.org" target="_blank" className="banner-button mobile-button">
          <Button label="View" iconRight="ph-bold ph-arrow-right" variant="primary" fill="outline" size="small" />
        </Link>
        <Button
          type="button"
          onClick={closeBanner}
          label="Close"
          icon="ph-fill ph-x-circle"
          size="small"
          className="close-button"
        />
      </Flex>
    </Wrapper>
  );
};
