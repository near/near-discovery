import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useEffect, useState } from 'react';
import type { NextPageWithLayout } from '@/utils/types';

const hotIcon = 'https://ipfs.near.social/ipfs/bafkreiewzowjm4fk7m5x3h32k6b4hpcdvwg23wndqpo5frzjiqr35xwnd4';

const trendIcon = 'https://ipfs.near.social/ipfs/bafkreid7uzfypfjyz7lvfjwpxyq5ikjxvzxf66vibmfujqhiafhwrcg2tm';

const myQuestIcon = 'https://ipfs.near.social/ipfs/bafkreigdmz5vpe5h2ifmenv5fklls4jay7smqvjw7u35e6xaclkwa3te6e';

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

  return (
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
  );
};

WarmUp.getLayout = useDefaultLayout;

export default WarmUp;
