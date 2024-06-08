import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import styles from './RoundButton.module.scss';

const RoundButton = ({
  size = 42,
  iconName = 'icon-arrow-up-right',
  iconWidth = 18,
  iconHeight = 18,
  onClick,
}) => {
  return (
    <button
      className={styles.button}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <Icon
        name={iconName}
        width={iconWidth}
        height={iconHeight}
        className={styles.icon}
      />
    </button>
  );
};

RoundButton.propTypes = {
  size: PropTypes.number,
  iconName: PropTypes.string,
  iconWidth: PropTypes.number,
  iconHeight: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

export default RoundButton;
