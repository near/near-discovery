import Big from 'big.js';

const formateAddress = (address: string) => {
  if (!address) return '-';

  if (address.indexOf('.near') > -1) return address;

  return address.slice(0, 6) + '...' + address.slice(-4);
};

function addThousandSeparator(numberString: string) {
  const parts = numberString.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const decimalPart = parts[1] ? `.${parts[1]}` : ''; // 添加小数部分，如果存在
  return integerPart + decimalPart;
}

const formateValue = (value: string | number, precision: number) => {
  if (Big(value).eq(0)) return '0';

  if (Big(value).lt(Big(10).pow(-precision))) {
    return `< ${Big(10).pow(-precision).toFixed(precision)}`;
  } else {
    return Big(value).toFixed(precision);
  }
};

const formateValueWithThousandSeparator = (value: string | number, precision: number) => {
  if (Big(value).eq(0)) return '0';

  if (Big(value).lt(Big(10).pow(-precision))) {
    return `< ${Big(10).pow(-precision).toFixed(precision)}`;
  } else {
    return addThousandSeparator(Big(value).toFixed(precision));
  }
};

const formateValueWithThousandSeparatorAndFont = (value: string | number, precision: number) => {
  if (Big(value).eq(0))
    return {
      integer: '0',
      decimal: '',
    };

  if (Big(value).lt(Big(10).pow(-precision))) {
    return {
      integer: '',
      decimal: `< ${Big(10).pow(-precision).toFixed(precision)}`,
    };
  } else {
    const finalValue = addThousandSeparator(Big(value).toFixed(precision));
    return {
      integer: finalValue.split('.')[0],
      decimal: '.' + finalValue.split('.')[1],
    };
  }
};

export { formateAddress, formateValue, formateValueWithThousandSeparator, formateValueWithThousandSeparatorAndFont };
