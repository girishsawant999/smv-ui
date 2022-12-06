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

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement>, ILoadersTypes {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  buttonType?: 'primary' | 'secondary' | 'tertiary' | 'error';
  className?: string;
}

const Button: React.FC<IButtonProps> = function (props): JSX.Element {
  const {
    children,
    disabled,
    loading = false,
    buttonType = 'primary',
    className = '',
    loader = 'circle-notch',
    ...buttonProps
  } = props;

  return (
    <button disabled={disabled || loading} className={clsx(buttonType, className)} {...buttonProps}>
      <When isTrue={loading}>
        <span>
          <Loader loader={loader} />
        </span>
      </When>
      <span>{children}</span>
      <Ripple />
    </button>
  );
};

interface IBackButton extends Omit<IButtonProps, 'children'> {
  children?: React.ReactNode;
}
export const BackButton = (props: IBackButton): JSX.Element => {
  return (
    <Button data-back-button buttonType="tertiary" {...props}>
      <Icons.LeftArrowIcon width="20" height="20" />
    </Button>
  );
};

export const CrossButton = (props: IBackButton): JSX.Element => {
  return (
    <Button data-cross-button buttonType="tertiary" {...props}>
      <Icons.CrossIcon strokeWidth="1.5" width="20" height="20" />
    </Button>
  );
};

export default Button;
