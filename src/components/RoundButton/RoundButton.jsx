import React from 'react';
import PropTypes from 'prop-types';

import s from './RoundButton.module.scss';
import Icon from 'components/Icon/Icon';

const RoundButton = ({
  size = 42,
  iconName = 'icon-arrow-up-right',
  iconWidth = 18,
  iconHeight = 18,
  className = '',
  iconClassName = '',
  onClick,
}) => {
  return (
    <button
      className={className || s.button}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <Icon
        name={iconName}
        width={iconWidth}
        height={iconHeight}
        className={s[iconClassName] || s.icon}
      />
    </button>
  );
};

RoundButton.propTypes = {
  size: PropTypes.number,
  iconName: PropTypes.string,
  iconWidth: PropTypes.number,
  iconHeight: PropTypes.number,
  onClick: PropTypes.func,
};

export default RoundButton;
