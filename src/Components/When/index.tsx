import React from 'react';

const When: React.FC<{
  children: React.ReactNode;
  isTrue?: boolean;
}> = ({ children, isTrue }) => {
  if (!isTrue) return <></>;
  return <>{children}</>;
};

export default When;
