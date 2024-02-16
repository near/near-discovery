import { formatDistanceToNowStrict } from 'date-fns';

type InputValue = Date | string | number | null | undefined;

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNowStrict(new Date(date), {
        addSuffix: true,
      })
    : '';
}
