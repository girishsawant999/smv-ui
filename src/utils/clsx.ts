const clsx = (...args: (string | boolean)[]): string => args.filter(_ => typeof _ === 'string').join(' ');

export default clsx;
