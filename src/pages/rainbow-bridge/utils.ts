import Big from 'big.js';

const shrinkToken = (value: string, decimals: number) => {
  return new Big(value || 0).div(Big(10).pow(decimals || 24));
};

const expandToken = (value: string, decimals: number) => {
  return new Big(value).mul(Big(10).pow(decimals));
};

export { shrinkToken, expandToken };
