import { React } from 'react';
import Container from 'components/Container/Container';

import s from './Hero.module.scss';

const Hero = () => {
  return (
    <Container className={s.hero_container} style={{ borderRadius: '20px' }}>
      <div className={s.hero_content}>
        <h1 className={s.hero_title}>
          IMPROVE YOUR <br className={s.break} /> CULINARY TALENTS
        </h1>
        <p className={s.hero_text}>
          Amazing recipes for beginners in the world of cooking, enveloping you
          in the aromas and tastes of various cuisines.
        </p>
        <button className={s.hero_button}>ADD RECIPE</button>
        <div className={s.images}>
          <div className={s.image_main}></div>
          <div className={s.image_secondary}></div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
