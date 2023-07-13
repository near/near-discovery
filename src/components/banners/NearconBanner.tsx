import Image from 'next/image';
import styled from 'styled-components';

import icon from '@/assets/images/nearcon_banner_2023.svg';
import { VmComponent } from '@/components/vm/VmComponent';
import { useBanner } from '@/hooks/useBanner';
import { useBosComponents } from '@/hooks/useBosComponents';

type FlexProps = {
  gap?: string;
  alignItems?: string;
  justifyContent?: string;
  direction?: string;
  wrap?: string;
};

type TextProps = {
  size?: string;
  lineHeight?: string;
  weight?: string;
  color?: string;
};

const Wrapper = styled.div`
  background: #00ec97;
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

const Text = styled.p<TextProps>`
  font-family: 'FK Grotesk', sans-serif;
  font-size: ${(p) => p.size ?? '18px'};
  line-height: ${(p) => p.lineHeight ?? '1.5'};
  font-weight: ${(p) => p.weight ?? '400'};
  color: ${(p) => p.color ?? '#000'};
  margin: 0;
`;

const VerySmallLabel = styled.div`
  @media (max-width: 380px) {
    display: inline !important;
  }
`;

const SmallLabel = styled.div`
  @media (max-width: 380px) {
    display: none !important;
  }
`;

const Button = styled.button`
  all: unset;
  display: block;
  height: 16px;
  line-height: 16px;
  color: #664d04;
`;

const ButtonLabel = () => (
  <>
    <VerySmallLabel className='d-none d-sm-inline'>View</VerySmallLabel>
    <SmallLabel className='d-inline d-sm-none'>Early Bird Tickets</SmallLabel>
  </>
);

export const NearconBanner = () => {
  const components = useBosComponents();
  const [ isBannerVisible, setBanners ] = useBanner();

  const closeBanner = () => {
    setBanners(!isBannerVisible);
  }

  if (!isBannerVisible) return null;

  return (
    <Wrapper>
      <Flex gap="24px" alignItems="center" justifyContent="center">
        <Image src={icon} alt='nearcon-banner' />
        <Text size="16px" weight="500" className='d-none d-sm-inline'>Early Bird Tickets are live!</Text>
        <VmComponent
          src={components.digButton}
          props={{
            href: 'http://nearcon.org',
            label: <ButtonLabel/>,
            iconRight: 'ph-bold ph-arrow-right',
            variant: 'primary',
            fill: 'outline',
            size: 'small',
            as: 'a',
            target: '_blank',
            style: { fontSize: "14px" },
          }}
        />
        <Button type="button" onClick={closeBanner}>
        <i className="ph-fill ph-x-circle" />
        </Button>
      </Flex>
    </Wrapper>
  );
};
