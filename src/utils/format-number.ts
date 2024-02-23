export function formatThousandsSeparator(n: number): string {
  const strSplit = n.toString().split('.');
  const integer = strSplit[0].split('');
  integer.reverse();
  const decimal = strSplit[1];
  const newInteger = [];
  for (let i = 0; i < integer.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      newInteger.push(',');
    }
    newInteger.push(integer[i]);
  }
  newInteger.reverse();
  let s = newInteger.join('');
  if (decimal) {
    s += `.${decimal}`;
  }
  return s;
}
