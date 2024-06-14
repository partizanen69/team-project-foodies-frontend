import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Container from '../Container/Container';
import s from './PathInfo.module.scss';
import classNames from 'classnames';

export const PathInfo = ({ currentPageName }) => {
  return (
    <Container className={s.path_info_container}>
      <NavLink className={classNames(s.page_name, s.home_name)} to="/">
        HOME
      </NavLink>
      <span className={classNames(s.page_name, s.home_name)}>/</span>
      <span className={classNames(s.page_name, s.current_page_name)}>
        {currentPageName}
      </span>
    </Container>
  );
};

PathInfo.propTypes = {
  currentPageName: PropTypes.string.isRequired,
};
