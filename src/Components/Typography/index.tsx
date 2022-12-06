import React, { useEffect, useRef } from 'react';
import { clsx } from '../../utils';
import './style.scss';

export interface ITypography
  extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement | HTMLLabelElement> {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'code' | 'label' ;
  font?: 'primary' | 'secondary';
  weight?: 'light' | 'extra-light' | 'medium' | 'regular' | 'bold' | 'semi-bold' | 'extra-bold';
  color?: 'black' | 'white' | 'primary' | 'secondary' | 'tertiary' | 'error';
  size?: number;
}

const Typography = ({
  children,
  variant = 'p',
  font = 'primary',
  weight = 'regular',
  color = 'primary',
  className = '',
  size = 16,
  ...props
}: ITypography): JSX.Element => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ele = ref.current as HTMLElement;
    ele.style.setProperty('--font-size', size.toString());
  }, [ref.current, size]);

  const WrapperComponent = variant;
  return (
    <>
      <WrapperComponent
        ref={ref}
        className={clsx(`font-${font} weight-${weight} color-${color}`, className)}
        {...props}
      >
        <>{children}</>
      </WrapperComponent>
    </>
  );
};

export default Typography;
