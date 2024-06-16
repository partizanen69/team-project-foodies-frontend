import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from 'components/Container/Container';

import s from './Hero.module.scss';

const Hero = ({ openModal }) => {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleAddRecipeClick = () => {
    if (user) {
      navigate('/add');
    } else {
      openModal('sign in');
    }
  };

  return (
    <Container className={s.hero_container} style={{ borderRadius: '20px' }}>
      <span className={`${s.line} ${s.line1}`}></span>
      <span className={`${s.line} ${s.line2}`}></span>
      <span className={`${s.line} ${s.line3}`}></span>
      <span className={`${s.line} ${s.line4}`}></span>
      <div className={s.hero_content}>
        <h1 className={s.hero_title}>
          IMPROVE YOUR <br className={s.break} /> CULINARY TALENTS
        </h1>
        <p className={s.hero_text}>
          Amazing recipes for beginners in the world of cooking, enveloping you
          in the aromas and tastes of various cuisines.
        </p>
        <button className={s.hero_button} onClick={handleAddRecipeClick}>
          ADD RECIPE
        </button>
        <div className={s.images}>
          <div className={s.image_main}></div>
          <div className={s.image_secondary}></div>
        </div>
      </div>
    </Container>
  );
};

Hero.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default Hero;
