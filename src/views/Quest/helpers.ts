import { format } from 'date-fns';

export const getTimePeriods = (seconds: number) => {
  const MINUTE_IN_SECONDS = 60;
  const HOUR_IN_SECONDS = 3600;
  const DAY_IN_SECONDS = 86400;
  let delta = Math.abs(seconds);
  const timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (delta >= DAY_IN_SECONDS) {
    timeLeft.days = Math.floor(delta / DAY_IN_SECONDS);
    delta -= timeLeft.days * DAY_IN_SECONDS;
  }

  if (delta >= HOUR_IN_SECONDS) {
    timeLeft.hours = Math.floor(delta / HOUR_IN_SECONDS);
    delta -= timeLeft.hours * HOUR_IN_SECONDS;
  }

  if (delta >= MINUTE_IN_SECONDS) {
    timeLeft.minutes = Math.floor(delta / MINUTE_IN_SECONDS);
    delta -= timeLeft.minutes * MINUTE_IN_SECONDS;
  }

  timeLeft.seconds = delta;

  return timeLeft;
};

export const toTwo = (num: number): string => {
  return num < 10 ? '0' + num : '' + num;
};

export const formatTotalUsers = (users: number) => {
  if (!users) return '0';
  if (users > 1e6) return `${Math.ceil(users / 1e6)}M+`;
  if (users > 1e3) return `${Math.ceil(users / 1e6)}K+`;
  return `${users}+`;
};

export const formatPeriodDate = (start: string, end: string) => {
  console.log(start, end);
  if (!start || !end) return '';
  const patterns = 'yyyy/MM/dd';
  const _start = format(new Date(Number(start)), patterns);
  const _end = format(new Date(Number(end)), patterns);
  const hour = format(new Date(Number(end)), 'HH:mm');

  return `${_start} - ${_end} ${hour}`;
};
