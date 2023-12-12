import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const arrow = (
  <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L4 4L1 7" stroke="#979ABE" strokeLinecap="round" />
  </svg>
);
const hotIcon = 'https://assets.dapdap.net/images/bafkreiewzowjm4fk7m5x3h32k6b4hpcdvwg23wndqpo5frzjiqr35xwnd4.png';

const trendIcon = 'https://assets.dapdap.net/images/bafkreid7uzfypfjyz7lvfjwpxyq5ikjxvzxf66vibmfujqhiafhwrcg2tm.png';

const myQuestIcon = 'https://assets.dapdap.net/images/bafkreigdmz5vpe5h2ifmenv5fklls4jay7smqvjw7u35e6xaclkwa3te6e.png';

const WarmUp: NextPageWithLayout = () => {
  const components = useBosComponents();

  // get document width

  const [innerWidth, setInnerWidth] = useState<number>();

  const [putMenu, setPutMenu] = useState(false);

  useEffect(() => {
    const offset = putMenu ? 170 : 350;

    const innerWidth = window.innerWidth;
    setInnerWidth(innerWidth > 900 ? innerWidth - offset : innerWidth);
    const handleResize = () => {
      const innerWidth = window.innerWidth;

      setInnerWidth(innerWidth > 900 ? innerWidth - offset : innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [putMenu]);

  useEffect(() => {
    const getPutMenu = (e: any) => {
      setPutMenu(e.detail);
    };

    window.addEventListener('changePutEvent', getPutMenu);

    return () => window.removeEventListener('setItemEvent', getPutMenu);
  }, []);

  const Container = styled.div`
    margin: 0 8%;
    position: relative;
  `;

  const BreadCrumbs = styled.div`
    color: #979abe;
    font-size: 14px;
    margin-bottom: 30px;
    a {
      text-decoration: none;
      color: #979abe;
      display: inline-block;
      cursor: pointer;
    }
    svg {
      margin: 0 8px;
    }
    span {
      color: #ffffff;
    }
  `;

  return (
    <Container>
      <BreadCrumbs>
        <Link href="/">Home</Link>
        {arrow}
        <Link href="#">Deep Dive</Link>
        {arrow}
        <span>Polygon zkEVM</span>
      </BreadCrumbs>
      <ComponentWrapperPage
        src={components.warmUp}
        componentProps={{
          hotIcon,
          trendIcon,
          myQuestIcon,
          innerWidth,
        }}
        meta={{ title: 'Connect with the NEAR community.', description: 'Become part of the NEAR community.' }}
      />
    </Container>
  );
};

WarmUp.getLayout = useDefaultLayout;

export default WarmUp;
