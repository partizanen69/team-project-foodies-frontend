import React from 'react';
import PropTypes from 'prop-types';
import styles from './Subtitle.module.scss';

const Subtitle = ({ children }) => {
  return <p className={styles.subtitle}>{children}</p>;
};

Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Subtitle;
