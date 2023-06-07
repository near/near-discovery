import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useBosLoaderInitializer } from '@/hooks/useBosLoaderInitializer';
import { useHashUrlBackwardsCompatibility } from '@/hooks/useHashUrlBackwardsCompatibility';
import { checkLoggedIn } from '@/redux/slices/account';
import type { AppDispatch } from '@/redux/store';
import { init as initializeSegment } from '@/utils/analytics';
import { handlePageFlashPrevent } from '@/utils/userAgent';

type Props = {
  children: unknown;
};

const VmInitializer = dynamic(() => import('./vm/VmInitializer'), {
  ssr: false,
});

// The idea is to keep all initialization-related implementations here, like those related to signing in or VM
export default function Initializer({ children }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  useBosLoaderInitializer();
  useHashUrlBackwardsCompatibility();

  useEffect(() => {
    handlePageFlashPrevent();
  }, []);

  useEffect(() => {
    initializeSegment();
  }, []);

  useEffect(() => {
    // checking if a user is potentially signed in
    dispatch(checkLoggedIn());
  }, [dispatch]);

  return (
    <>
      <VmInitializer />
      {children}
    </>
  );
}
