import React from 'react';
import { ISVGProps } from '.';

function CrossIcon(props: ISVGProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 18 18"
      {...props}
    >
      <path
        stroke="#1A181B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 1l16 16M17 1L1 17"
        {...props}
      ></path>
    </svg>
  );
}

export default CrossIcon;
