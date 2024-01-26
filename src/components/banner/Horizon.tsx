import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { Button } from '@/components/lib/Button';
import { useBanner } from '@/hooks/useBanner';

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
  padding: 8px 0;
  background: rgb(102, 160, 255);
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

export const HorizonBanner = (props: Props) => {
  const [isBannerVisible, setBanners] = useBanner();

  const closeBanner = () => {
    setBanners(!isBannerVisible);
  };

  if (!isBannerVisible) return null;

  return (
    <Wrapper inline={props.inline}>
      <Flex gap="14px" alignItems="center" justifyContent="center">
        <Link href="https://www.hzn.xyz/hzn/" target="_blank" className="banner-button desktop-button">
          <Button
            label="Apply to the next Horizon Accelerator Program"
            iconRight="ph-bold ph-arrow-right"
            variant="primary"
            fill="outline"
            size="small"
          />
        </Link>
        <Link href="https://www.hzn.xyz/hzn/" target="_blank" className="banner-button mobile-button">
          <Button
            label="Apply to the next Horizon Accelerator Program"
            iconRight="ph-bold ph-arrow-right"
            variant="primary"
            fill="outline"
            size="small"
          />
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
