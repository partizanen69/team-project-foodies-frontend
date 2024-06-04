import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import s from './Container.module.scss'


export default function Container({ children, className }) {
  const classes = classNames(s.container, className);
  return <div className={classes}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.node,
};