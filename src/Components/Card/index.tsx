import React from 'react';
import { clsx } from '../../utils';
import './style.scss';

export interface ICardProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: JSX.Element;
}

const Card = ({ children, className = '', ...props }: ICardProps): JSX.Element => {
  return (
    <div className={clsx('card-wrapper', className)} {...props}>
      {children}
    </div>
  );
};

export default Card;
