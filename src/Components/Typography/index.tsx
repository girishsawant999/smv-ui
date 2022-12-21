import React, { useEffect, useRef } from 'react';
import { clsx } from '../../utils';
import './style.scss';

export interface ITypography
  extends React.HTMLAttributes<
    HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement | HTMLLabelElement
  > {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'code' | 'label';
  textStyle?:
    | 'regular-xs'
    | 'regular-sm'
    | 'regular-base'
    | 'regular-lg'
    | 'regular-xl'
    | 'regular-2xl'
    | 'semi-bold-sm'
    | 'semi-bold-base'
    | 'semi-bold-lg'
    | 'semi-bold-xl'
    | 'bold-2xl'
    | 'none';
  font?: 'primary' | 'secondary';
  weight?: 'regular' | 'semi-bold' | 'bold';
  color?: string;
  size?: number;
}

const Typography = ({
  children,
  variant = 'p',
  font = 'primary',
  weight,
  color,
  className = '',
  textStyle = 'regular-base',
  size,
  ...props
}: ITypography): JSX.Element => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ele = ref.current as HTMLElement;
    size && ele.style.setProperty('--font-size', size.toString());
    color && ele.style.setProperty('--text-color', color);
  }, [ref.current, size, color]);

  const WrapperComponent = variant;
  return (
    <>
      <WrapperComponent
        ref={ref}
        className={clsx(`font-${font}`, weight ? `weight-${weight}` : '', textStyle, className)}
        {...props}
      >
        <>{children}</>
      </WrapperComponent>
    </>
  );
};

export default Typography;
