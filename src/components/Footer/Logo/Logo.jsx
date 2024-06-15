import { NavLink } from 'react-router-dom';
import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <NavLink to="/" className={styles.logo}>
     foodies
    </NavLink>
  );
};

export default Logo;
