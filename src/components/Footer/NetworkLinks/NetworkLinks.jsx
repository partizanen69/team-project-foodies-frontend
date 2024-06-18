import RoundButton from 'components/RoundButton/RoundButton';
import { networkLinks } from './data';
import styles from './NetworkLinks.module.scss';

export const NetworkLinks = () => (
  <ul className={styles.networkLinks}>
    {networkLinks.map(({ id, link }) => (
      <li key={id}>
        <a
          href={link}
          className={styles.networkLink}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <RoundButton
            iconName={`icon-${id}`}
            className={'network-link-button'}
            iconClassName={'network-link-icon'}
          />
        </a>
      </li>
    ))}
  </ul>
);
