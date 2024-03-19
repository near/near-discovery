import { useCallback } from 'react';

import { useBosComponents } from '@/hooks/useBosComponents';
import { useAuthStore } from '@/stores/auth';
import { useVmStore } from '@/stores/vm';

import { VmComponent } from '../vm/VmComponent';
import * as S from './styles';

export const LargeScreenProfileDropdown = () => {
  const components = useBosComponents();
  const near = useVmStore((store) => store.near);
  const availableStorage = useAuthStore((store) => store.availableStorage);
  const logOut = useAuthStore((store) => store.logOut);

  const withdrawTokens = useCallback(async () => {
    if (!near) return;
    await near.contract.storage_withdraw({}, undefined, '1');
  }, [near]);

  return (
    <S.LargeScreenHeaderActionWrapper>
      <VmComponent src={components.navigation.profileDropdown} props={{ availableStorage, withdrawTokens, logOut }} />
    </S.LargeScreenHeaderActionWrapper>
  );
};
