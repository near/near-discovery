import Big from 'big.js';

export function balanceFormated(balance?: string, digits: number = 4) {
  if (!balance) return '-';
  const _balance = new Big(balance);
  if (_balance.eq(0)) return '0';
  if (_balance.lt(1 / 10 ** 4)) return `<${1 / 10 ** 4}`;
  return _balance.toFixed(digits);
}
