export interface ILoadersTypes {
  loader?:
    | 'spinner'
    | 'circle-notch'
    | 'three-dots'
    | 'ball-triangle'
    | 'bars'
    | 'filling-box'
    | 'puff'
    | 'half-circles'
    | 'circular-stripes';
}

export interface ILoaders extends React.HTMLAttributes<HTMLOrSVGElement>, ILoadersTypes {}
