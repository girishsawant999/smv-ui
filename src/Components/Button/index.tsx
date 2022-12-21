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
  variant?: 'primary' | 'secondary' | 'tertiary' | 'none';
  size?: 'sm' | 'rg' | 'lg';
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
    variant = 'primary',
    size = 'rg',
    className = '',
    loader = 'circular-stripes',
    ripple = true,
    fullWidth = false,
    fontSize,
    style,
    ...buttonProps
  } = props;

  return (
    <button
      disabled={disabled || loading}
      className={clsx(variant, size, fullWidth && 'full-width', className)}
      {...buttonProps}
    >
      <When isTrue={loading}>
        <span className="spinner">
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
    <Button data-back-button variant="tertiary" {...props}>
      <Icons.LeftArrowIcon />
    </Button>
  );
};

export const CrossButton = (props: IBackButton): JSX.Element => {
  return (
    <Button data-cross-button variant="tertiary" {...props}>
      <Icons.CrossIcon strokeWidth={1.5} />
    </Button>
  );
};

export default Button;
