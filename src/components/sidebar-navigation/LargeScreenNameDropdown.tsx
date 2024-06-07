import { useCallback } from 'react';

import { useBosComponents } from '@/hooks/useBosComponents';
import { useAuthStore } from '@/stores/auth';
import { useVmStore } from '@/stores/vm';

import { VmComponent } from '../vm/VmComponent';
import * as S from './styles';

export const LargeScreenNameDropdown = () => {
  const components = useBosComponents();
  const near = useVmStore((store) => store.near);
  const availableStorage = useAuthStore((store) => store.availableStorage);
  const availableStorageDisplay = availableStorage?.gte(10) ? availableStorage.div(1000).toFixed(2) : '0';
  const logOut = useAuthStore((store) => store.logOut);

  const withdrawTokens = useCallback(async () => {
    if (!near) return;
    await near.contract.storage_withdraw({}, undefined, '1');
  }, [near]);

  return (
    <S.LargeScreenHeaderNameWrapper>
      <VmComponent
        src={components.navigation.nameDropdown}
        props={{
          availableStorage: availableStorageDisplay,
          withdrawTokens,
          logOut,
        }}
      />
    </S.LargeScreenHeaderNameWrapper>
  );
};
