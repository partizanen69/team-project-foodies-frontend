// import components
import Icon from 'components/Icon/Icon';

// import tools
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// import styles
import s from './NavigationButton.module.scss';

// import store actions
import { clearCategoryFilter } from '../../../redux/actions/filtersActions';

const NavigationButton = ({ title }) => {
  const dispatch = useDispatch();

  const onBack = () => {
    dispatch(clearCategoryFilter())
  }

  return (
    <button
      type="button"
      className={s.recipes_navigation_button}
      onClick={onBack}
    >
      <Icon
        name="icon-arrow-back"
        className={s.recipes_navigation_button_icon}
      />
      <span className={s.recipes_navigation_button_text}>{title}</span>
    </button>
  );
};

NavigationButton.propTypes = {
  title: PropTypes.string,
};

export default NavigationButton;
