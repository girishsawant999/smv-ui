import React, { useEffect, useRef } from "react";
import './style.scss';

export interface IRipple {
	overflow?: boolean;
	rippleTime?: number;
}

const RIPPLE_TIME = 800;

const Ripple = ({ overflow = false, rippleTime = RIPPLE_TIME }: IRipple): JSX.Element => {
  const ref = useRef<HTMLElement | null>(null);
  const timerRef = useRef<any>(null);
  const longPressHandlerTimer = useRef<any>(null);

  const startRippling = (e: MouseEvent | TouchEvent, _rippleTime = rippleTime): void => {
    if (!e) return;
    if (longPressHandlerTimer.current) clearTimeout(longPressHandlerTimer.current);

    if (!ref.current) return;
    const parent = (ref.current as HTMLElement).parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const ripple = parent.querySelector("span[data-ripple]") as HTMLElement;
    if (!ripple) return;
    const diameter = Math.max(parentRect.width, parentRect.height);
    const radius = diameter / 2;
    ripple.style.width = ripple.style.height = `${diameter}px`;

    let mouseX = (e as MouseEvent).clientX;
    let mouseY = (e as MouseEvent).clientY;
    if (e.type === "touchstart") {
      mouseX = (e as TouchEvent).touches[0].clientX;
      mouseY = (e as TouchEvent).touches[0].clientY;
    }

    ripple.style.left = `${mouseX - (parentRect.left + radius)}px`;
    ripple.style.top = `${mouseY - (parentRect.top + radius)}px`;
    ripple.style.setProperty("--ripple-time", _rippleTime.toString());

    parent?.setAttribute("data-rippling", "true");
    timerRef.current = setTimeout(() => {
      parent?.setAttribute("data-rippling", "false");
    }, _rippleTime);
  };

  const mouseDownHandler = (e: MouseEvent | TouchEvent) => {
    longPressHandlerTimer.current = setTimeout(() => {
      startRippling(e, 2000);
    }, 400);
  };

  const mouseUpHandler = () => {
    if (longPressHandlerTimer.current) clearTimeout(longPressHandlerTimer.current);
  };

  useEffect(() => {
    if (!ref.current) return;

    const parent = (ref.current as HTMLElement).parentElement;
    parent?.setAttribute("data-ripple-parent", "true");
    parent?.setAttribute("data-ripple-overflow", overflow.toString());
    parent?.addEventListener("click", startRippling);
    parent?.addEventListener("mousedown", mouseDownHandler);
    parent?.addEventListener("mouseout", mouseUpHandler);
    parent?.addEventListener("touchstart", mouseDownHandler);
    parent?.addEventListener("touchend", mouseUpHandler);

    return () => {
      parent?.removeEventListener("click", startRippling);
      parent?.removeEventListener("mousedown", mouseDownHandler);
      parent?.removeEventListener("mouseup", mouseUpHandler);
      parent?.removeEventListener("touchstart", mouseDownHandler);
      parent?.removeEventListener("touchend", mouseUpHandler);
    };
  }, [ ref.current, overflow, rippleTime ]);

  return (
    <span ref={ref} data-ripple style={{ "--ripple-time": rippleTime.toString() } as React.CSSProperties}></span>
  );
};

export default Ripple;
