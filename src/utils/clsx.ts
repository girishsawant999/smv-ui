const clsx = (...args: string[]): string => args.filter(_ => typeof _ === 'string').join(' ');

export default clsx;
