import Big from 'big.js';

const formateAddress = (address: string) => {
  if (!address) return '-';

  if (address.indexOf('.near') > -1) return address;

  return address.slice(0, 6) + '...' + address.slice(-4);
};

const formateValue = (value: string | number, precision: number) => {
  if (Big(value).lt(Big(10).pow(-precision))) {
    return `< ${Big(10).pow(-precision).toFixed(precision)}`;
  } else {
    return Big(value).toFixed(precision);
  }
};

export { formateAddress, formateValue };
