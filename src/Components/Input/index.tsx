import React from 'react';
import './style.scss';

export interface IInput
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  fullWidth?: boolean;
}

const Input = (props: IInput) => {
  const { fullWidth = false, ...otherProps } = props;
  return (
    <>
      <input data-smv-input type="text" data-full-width={fullWidth} {...otherProps} />
    </>
  );
};

export default Input;
