import { utils } from 'ethers';

export function ellipsAccount(account?: string) {
  if (!account || !utils.isAddress(account)) return '-';
  return account.slice(0, 6) + '...' + account.slice(-4);
}

export function ellipsLongAccount(account?: string) {
  if (!account || !utils.isAddress(account)) return '-';
  return account.slice(0, 10) + '...' + account.slice(-6);
}
