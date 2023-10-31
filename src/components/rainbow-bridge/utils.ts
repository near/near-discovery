import Big from 'big.js';

const shrinkToken = (value: string, decimals: number) => {
  return new Big(value || 0).div(Big(10).pow(decimals || 24));
};

const expandToken = (value: string, decimals: number) => {
  return new Big(value).mul(Big(10).pow(decimals));
};

const formateDate = (inputDateString: string) => {
  const date = new Date(inputDateString);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? 'PM' : 'AM';

  const hours12 = hours % 12 || 12;

  const formattedDate = `${month} ${day.toString().padStart(2, '0')}, ${year} ${hours12
    .toString()
    .padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;

  return formattedDate;
};

export { shrinkToken, expandToken, formateDate };
