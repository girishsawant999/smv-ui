import React from 'react';
import * as Icons from '../../Icons';
import { clsx } from '../../utils';
import Loader from '../Loader';
import { ILoadersTypes } from '../Loader/types';
import Ripple from '../Ripple';
import './style.scss';

interface IWhen {
  isTrue: boolean;
  children: React.ReactNode;
}
const When = ({ isTrue, children }: IWhen): JSX.Element => {
  if (!isTrue) return <></>;
  return <>{children}</>;
};

export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement>, ILoadersTypes {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  buttonType?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'link';
  className?: string;
  ripple?: boolean;
  fullWidth?: boolean;
  fontSize?: number;
}

const Button: React.FC<IButtonProps> = function (props): JSX.Element {
  const {
    children,
    disabled,
    loading = false,
    buttonType = 'primary',
    className = '',
    loader = 'circle-notch',
    ripple = true,
    fullWidth = false,
    fontSize,
    style,
    ...buttonProps
  } = props;

  return (
    <button
      disabled={disabled || loading}
      className={clsx('smv-button', buttonType, fullWidth ? 'full-width' : '', className)}
      style={
        fontSize ? ({ '--font-size': fontSize, ...style } as React.CSSProperties) : { ...style }
      }
      {...buttonProps}
    >
      <When isTrue={loading}>
        <span>
          <Loader loader={loader} />
        </span>
      </When>
      <span>{children}</span>
      {ripple && <Ripple />}
    </button>
  );
};

export interface IBackButton extends Omit<IButtonProps, 'children'> {}

export const BackButton = (props: IBackButton): JSX.Element => {
  return (
    <Button data-back-button buttonType="tertiary" {...props}>
      <Icons.LeftArrowIcon width={20} height={20}  />
    </Button>
  );
};

export const CrossButton = (props: IBackButton): JSX.Element => {
  return (
    <Button data-cross-button buttonType="tertiary" {...props}>
      <Icons.CrossIcon strokeWidth={1.5} width={20} height={20} />
    </Button>
  );
};

export default Button;
