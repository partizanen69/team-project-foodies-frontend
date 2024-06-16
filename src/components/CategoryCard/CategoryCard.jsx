import React from 'react';
import PropTypes from 'prop-types';
import RoundButton from '../RoundButton/RoundButton';
import styles from './CategoryCard.module.scss';

const CategoryCard = ({ imgUrl, name, onClick, size }) => {
  const cardClass = size === 'large' ? styles.largeCard : styles.smallCard;

  const retinaUrl = `${(imgUrl || '').replace(/.jpg$/, '')}@2x.jpg`;

  return (
    <div className={`${styles.card} ${cardClass}`}>
      <img
        srcSet={`${retinaUrl} 2x`}
        src={imgUrl}
        alt={name}
        className={styles.image}
      />
      <div className={styles.content}>
        <div className={styles.titleHolder}>
          <p className={styles.title}>{name}</p>
        </div>
        <RoundButton
          size={44}
          iconName="icon-arrow-up-right"
          className={'buttonLightStroke'}
          iconClassName={'arrowLight'}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'large']).isRequired,
};

export default CategoryCard;
