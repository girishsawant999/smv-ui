import { useLayoutEffect, useRef, useState } from 'react';

const useDelayMount = (mountReference: boolean, extraDelay = 0) => {
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<null | number>(null);

  useLayoutEffect(() => {
    if (mountReference) {
      timerRef.current = requestAnimationFrame(() => {
        setTimeout(() => setMounted(true), extraDelay);
      });
    }

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [mountReference]);

  return mountReference ? mounted : false;
};

export default useDelayMount;
