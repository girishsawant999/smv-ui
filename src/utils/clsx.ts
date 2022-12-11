const clsx = (...args: (string | boolean)[]): string => args.filter(_ => _).join(' ');

export default clsx;
