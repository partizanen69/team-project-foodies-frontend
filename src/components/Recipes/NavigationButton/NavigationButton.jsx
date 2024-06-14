import Icon from 'components/Icon/Icon';
import PropTypes from 'prop-types';
import s from './NavigationButton.module.scss';

const NavigationButton = ({ title, action }) => {
  return (
    <button
      type="button"
      className={s.recipes_navigation_button}
      click={action}
    >
      <Icon
        name="icon-arrow-back"
        width="16"
        height="16"
        className={s.recipes_navigation_button_icon}
      />
      <span className={s.recipes_navigation_button_text}>{title}</span>
    </button>
  );
};

NavigationButton.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func,
};

export default NavigationButton;
