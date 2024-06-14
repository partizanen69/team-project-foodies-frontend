import Container from '../Container/Container';
// import Logo from "../Loader/Loader";
import { NetworkLinks } from './NetworkLinks/NetworkLinks';
import { CopyRight } from "./CopyRight/CopyRight";
import  Logo from './Logo/Logo';
import styles from "./Footer.module.scss";

const Footer = () => (
  <footer>
    <Container>
      <div className={styles.top}>
        <Logo />
        <NetworkLinks />
      </div>
    </Container>
    <div className={styles.bottom}>
      <CopyRight />
    </div>
  </footer>
);

export default Footer;
