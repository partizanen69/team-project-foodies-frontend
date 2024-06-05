import {React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'components/Container/Container';

import s from './Hero.module.scss';

const Hero = () => {
  return (
      <Container className={s.hero_container} style={{borderRadius: '20px'}}>
            <p className={s.title}>Hero</p>
      </Container>
  );
};

Hero.propTypes = {
};

export default Hero;