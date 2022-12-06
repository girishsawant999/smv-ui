import React from 'react';
import { ISVGProps } from '.';

function LeftArrowIcon(props: ISVGProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="22"
      fill="none"
      viewBox="0 0 12 22"
      {...props}
    >
      <path
        stroke="#1A181B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 20.493l-9.747-9.746L11 1"
        {...props}
      ></path>
    </svg>
  );
}

export default LeftArrowIcon;
