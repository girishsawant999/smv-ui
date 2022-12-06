import React, { Suspense } from 'react';
import Puff from '../Components/Loader/Puff';

const defaultFallback: React.ReactNode = <Puff />;

const withSuspense = <T extends object>(
  Component: React.FC<T>,
  fallback: React.ReactNode = defaultFallback
): React.FC<T> => {
  const SuspenseComponent = (props: T): JSX.Element => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );

  return SuspenseComponent;
};

export default withSuspense;
