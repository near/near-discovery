import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAccount from '@/hooks/useAccount';
import { useDefaultLayout } from '@/hooks/useLayout';

import popupsData from '@/config/all-in-one/chains';

const AllInOne = () => {
  const router = useRouter();
  const { chainId } = useAccount();

  useEffect(() => {
    if (chainId) {
      const chains = Object.values(popupsData);
      const chain = chains.find((chain) => chain.chainId === chainId);
      router.replace(`/all-in-one/${chain ? chain.path : 'arbitrum'}`);
    }
  }, [chainId]);

  return <div />;
};

AllInOne.getLayout = useDefaultLayout;

export default AllInOne;
