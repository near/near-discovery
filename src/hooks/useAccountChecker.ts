import { useAccountCheckerStore } from '@/stores/accountChecker';
import { useEffect, useState } from 'react';
import useAccount from './useAccount';
import { checkAddressIsInvited } from '@/apis';

export default function useAccountChecker() {
  const { account } = useAccount();
  const accountCheckerStore = useAccountCheckerStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checker = async () => {
      if (!account) return;
      try {
        const invited = await checkAddressIsInvited(account);
        setChecked(invited);
        const _accounts = accountCheckerStore.accounts;
        _accounts[account] = invited;
        accountCheckerStore.set({ accounts: _accounts });
      } catch (err) {
        setChecked(false);
      }
    };
    if (!account) {
      setChecked(false);
      return;
    }
    if (accountCheckerStore.accounts[account]) {
      setChecked(true);
      return;
    }
    checker();
  }, [account]);
  return { checked, setChecked };
}
