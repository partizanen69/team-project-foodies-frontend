import React from 'react';
import icons from '../../assets/icons/icons.svg';

// ---- usage example -------
// import Icon from './Icon';

// const App = () => (
//   <div>
//     <Icon name="icon-home" />
//     <Icon name="icon-user" />
//   </div>
// );

const Icon = ({ name, className = '' }) => (
  <svg className={className}>
    <use xlinkHref={`${icons}#${name}`} />
  </svg>
);

export default Icon;
