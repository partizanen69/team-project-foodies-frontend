import React from 'react';
import PropTypes from 'prop-types';
import styles from './MainTitle.module.scss';

const MainTitle = ({ children }) => {
  return <h2 className={styles.title}>{children}</h2>;
};

MainTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainTitle;
