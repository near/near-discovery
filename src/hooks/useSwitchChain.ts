import { useSetChain } from '@web3-onboard/react';
import { useState } from 'react';
import useAccount from './useAccount';
import useConnectWallet from './useConnectWallet';

export default function useSwitchChain() {
  const [{ settingChain }, setChain] = useSetChain();
  const { account } = useAccount();
  const { onConnect } = useConnectWallet();
  const [switching, setSwitching] = useState(false);

  const switchChain = async (params: any, cb?: any) => {
    setSwitching(true);
    if (!account) {
      const result = await onConnect();
      if (!result?.length) {
        setSwitching(false);
        return;
      }
    }
    await setChain(params);
    setSwitching(false);
    cb?.();
  };

  return { switching, switchChain };
}
