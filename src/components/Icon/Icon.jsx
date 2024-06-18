import React from 'react';
import icons from '../../assets/icons/icons.svg';

const Icon = ({ name, className = '', onClick = () => {}}) => (
  <svg className={className} onClick={onClick}>
    <use xlinkHref={`${icons}#${name}`} />
  </svg>
);

export default Icon;
