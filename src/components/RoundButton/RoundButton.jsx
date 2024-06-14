import React from 'react';
import PropTypes from 'prop-types';

import s from './RoundButton.module.scss';
import Icon from 'components/Icon/Icon';
import classNames from 'classnames';

const RoundButton = ({
  iconName = 'icon-arrow-up-right',
  className = '',
  iconClassName = '',
  onClick,
}) => {
  return (
    <button className={classNames(s.button, s[className])} onClick={onClick}>
      <Icon name={iconName} className={classNames(s.icon, s[iconClassName])} />
    </button>
  );
};

RoundButton.propTypes = {
  iconName: PropTypes.string,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  onClick: PropTypes.func,
};

export default RoundButton;
