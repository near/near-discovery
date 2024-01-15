export function formateTxDate(_date: any) {
  if (!_date) return '';
  const monthsStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(_date);
  const monthStr = monthsStr[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const toTwo = (num: number) => (num >= 10 ? num : '0' + num);
  const hourStr = hour % 12;
  const minutes = date.getMinutes();
  const unit = hour > 11 ? 'PM' : 'AM';

  return `${monthStr} ${day}, ${year} ${toTwo(hourStr)}:${toTwo(minutes)} ${unit}`;
}
