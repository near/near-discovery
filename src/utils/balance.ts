import Big from 'big.js';

export function balanceFormated(balance?: string | number, digits = 4) {
  if (!balance) return '0';
  const _balance = new Big(balance);
  if (_balance.eq(0)) return '0';
  if (_balance.lt(1 / 10 ** digits)) return `<${1 / 10 ** digits}`;
  return _balance.toFixed(digits);
}

export function valueFormated(balance?: string, price?: string, digits = 2) {
  if (!balance || !price) return '0';
  const _balance = new Big(balance);
  const _price = new Big(price);
  if (_balance.eq(0) || _price.eq(0)) return '0';
  const total = _balance.mul(_price);
  if (total.lt(1 / 10 ** digits)) return `<${1 / 10 ** digits}`;
  return total.toFixed(digits);
}

export function balanceShortFormated(balance?: string | number, digits = 1) {
  if (!balance) return '0';
  const _balance = new Big(balance);
  if (_balance.eq(0)) return '0';
  if (_balance.lt(1 / 10 ** digits)) return `<${1 / 10 ** digits}`;
  if (_balance.lt(1e3)) return _balance.toFixed(digits);
  if (_balance.lt(1e6)) return _balance.div(1e3).toFixed(digits) + 'K';
  return _balance.div(1e6).toFixed(digits) + 'M';
}
