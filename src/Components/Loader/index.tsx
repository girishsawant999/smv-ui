import React, { lazy } from 'react';
import { withSuspense } from '../../utils';
import { ILoaders } from './types';

const BallTriangle = lazy(() => import(/* webpackChunkName: "BallTriangle" */ './BallTriangle'));
const Bars = lazy(() => import(/* webpackChunkName: "Bars" */ './Bars'));
const Puff = lazy(() => import(/* webpackChunkName: "Puff" */ './Puff'));
const HalfCircles = lazy(() => import(/* webpackChunkName: "HalfCircles" */ './HalfCircles'));
const FillingBox = lazy(() => import(/* webpackChunkName: "FillingBox" */ './FillingBox'));
const CircularStripes = lazy(
  () => import(/* webpackChunkName: "CircularStripes" */ './CircularStripes')
);
const Spinner = lazy(() => import(/* webpackChunkName: "Spinner" */ './Spinner'));
const CircleNotch = lazy(() => import(/* webpackChunkName: "CircleNotch" */ './CircleNotch'));
const ThreeDots = lazy(() => import(/* webpackChunkName: "ThreeDots" */ './ThreeDots'));

const Loader: React.FC<ILoaders> = ({ loader, ...otherProps }) => {
  switch (loader) {
    case 'spinner':
      return <Spinner {...otherProps} />;
    case 'circle-notch':
      return <CircleNotch {...otherProps} />;
    case 'three-dots':
      return <ThreeDots {...otherProps} />;
    case 'ball-triangle':
      return <BallTriangle {...otherProps} />;
    case 'bars':
      return <Bars {...otherProps} />;
    case 'puff':
      return <Puff {...otherProps} />;
    case 'half-circles':
      return <HalfCircles {...otherProps} />;
    case 'filling-box':
      return <FillingBox {...otherProps} />;
    case 'circular-stripes':
      return <CircularStripes {...otherProps} />;
    default:
      return <CircleNotch {...otherProps} />;
  }
};

export default withSuspense(Loader, null);
