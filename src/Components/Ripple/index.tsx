import React, { useEffect, useRef } from 'react';
import './style.scss';

interface IRipple {
  overflow?: boolean;
  rippleTime?: number;
}

const RIPPLE_TIME = 600;

const Ripple = ({ overflow = false, rippleTime = RIPPLE_TIME }: IRipple): JSX.Element => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const startRippling = (e: MouseEvent): void => {
      if (!e) return;
      const parent = e.currentTarget as HTMLElement;
      const ripple = parent.querySelector('span[data-ripple]') as HTMLElement;
      if (!ripple) return;
      const diameter = Math.max(parent.clientWidth, parent.clientHeight);
      const radius = diameter / 2;
      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${e.clientX - (parent.offsetLeft + radius)}px`;
      ripple.style.top = `${e.clientY - (parent.offsetTop + radius)}px`;
      parent?.setAttribute('data-rippling', 'true');
      setTimeout(() => {
        parent?.setAttribute('data-rippling', 'false');
      }, rippleTime);
    };

    const parent = (ref.current as HTMLElement).parentElement;
    parent?.setAttribute('data-ripple-parent', 'true');
    parent?.setAttribute('data-ripple-overflow', overflow.toString());
    parent?.addEventListener('click', startRippling);

    return () => {
      parent?.removeEventListener('click', startRippling);
    };
  }, [ref.current]);

  return (
    <span
      ref={ref}
      data-ripple
      style={
        {
          '--ripple-time': rippleTime.toString()
        } as React.CSSProperties
      }
    ></span>
  );
};

export default Ripple;
