import { Button } from '@near-pagoda/ui';
import { Text } from '@near-pagoda/ui';
import { ArrowUpRight, XCircle } from '@phosphor-icons/react';
import styled from 'styled-components';

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
  --bs-gutter-x: 1.5rem;
  padding: 8px calc(var(--bs-gutter-x) * 0.5);
  background: #00ec97;
  border-radius: ${(p) => (p.inline ? '5px' : 0)};

  .banner-text {
    @media (max-width: 600px) {
      font-size: 12px;
    }
  }

  .banner-button {
    font-size: 14px;

    @media (max-width: 600px) {
      font-size: 12px;
    }

    &.desktop-button {
      @media (max-width: 600px) {
        display: none !important;
      }
    }
    &.mobile-button {
      display: none;
      @media (max-width: 600px) {
        display: inline-flex !important;
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
        <Text className="banner-text" weight="500">
          Are you an early-stage founder? Apply to our equity-free accelerator program. Applications are now live!
        </Text>
        <Button
          href="https://airtable.com/appFoIqAoY0ikoVIb/shrst8Tt4PUtYTSvD"
          target="_blank"
          label="Apply Now"
          iconRight={<ArrowUpRight weight="bold" />}
          variant="primary"
          fill="outline"
          size="small"
          className="banner-button desktop-button"
        />

        <Button
          href="https://airtable.com/appFoIqAoY0ikoVIb/shrst8Tt4PUtYTSvD"
          target="_blank"
          label="Apply"
          iconRight={<ArrowUpRight weight="bold" />}
          variant="primary"
          fill="outline"
          size="small"
          className="banner-button mobile-button"
        />

        <Button
          type="button"
          onClick={closeBanner}
          label="Close"
          iconRight={<XCircle weight="fill" />}
          size="small"
          className="close-button"
          fill="ghost"
        />
      </Flex>
    </Wrapper>
  );
};
