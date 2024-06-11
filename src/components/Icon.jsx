import React from 'react';
import icons from '../assets/icons/icons.svg';

// ---- usage example -------
// import Icon from './Icon';

// const App = () => (
//   <div>
//     <Icon name="icon-home" />
//     <Icon name="icon-user" />
//   </div>
// );

const Icon = ({ name, width = 32, height = 32, className = '' }) => (
  <svg width={width} height={height} className={className}>
    <use xlinkHref={`${icons}#${name}`} />
  </svg>
);

export default Icon;
