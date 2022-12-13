export { default as clsx } from './clsx';
export { default as withSuspense } from './withSuspense';
export const daysMap = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
export const monthMap = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const getMonthStr = (month: number) => monthMap[Math.max(Math.min(11, month), 0)] || 'Month';

export const convertDate = (date: string | number | Date): Date => {
  let _date = new Date();
  if (!Number.isNaN(new Date(date).getTime())) {
    return new Date(date);
  }

  return _date;
};

export const getDateTimeStamp = (date: string | number | Date): number => {
  const _date = convertDate(date);
  return new Date(_date.getFullYear(), _date.getMonth(), _date.getDate(), 0, 0, 0, 0).getTime();
};
