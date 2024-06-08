import React from 'react';

// ---- usege example -------
// import Icon from './Icon';

// const App = () => (
//   <div>
//     <Icon name="icon-home" />
//     <Icon name="icon-user" />
//   </div>
// );


const Icon = ({ name, width = 32, height = 32 }) => (
  <svg width={width} height={height}>
    <use xlinkHref={`${process.env.PUBLIC_URL}/icons.svg#${name}`} />
  </svg>
);

export default Icon;

