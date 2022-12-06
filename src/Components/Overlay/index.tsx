import React, { useEffect } from 'react';
import { clsx } from '../../utils';
import { CrossButton } from '../Button';
import './style.scss';

export interface IOverlay {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  theme?: 'light' | 'dark';
  coords?: {
    x: number;
    y: number;
  };
}
const Overlay = ({ children, open, onClose, theme = 'light', coords }: IOverlay): JSX.Element => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }
  }, [open]);

  return (
    <div
      data-show={open}
      data-theme={theme}
      className={clsx('overlayContainer')}
      style={
        {
          '--transform-coords': coords ? `${coords.x}px ${coords.y}px` : 'center',
        } as React.CSSProperties
      }
    >
      <CrossButton ripple={false} onClick={onClose} className="close-button" />
      <div className={clsx('overlayContent')}>{children}</div>
    </div>
  );
};

export default Overlay;
