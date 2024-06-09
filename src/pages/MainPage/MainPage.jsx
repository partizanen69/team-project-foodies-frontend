import {React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'components/Container/Container';
import Hero from 'components/Hero/Hero';
import s from './MainPage.module.scss';

const MainPage = () => {
  
  return (
      <Container className={s.main_container}>
        <Hero/>
      </Container>
  );
};

MainPage.propTypes = {
};

export default MainPage;