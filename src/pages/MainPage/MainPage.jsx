import {React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'components/Container/Container';
import Hero from 'components/Hero/Hero';
import Footer from 'components/Footer/Footer';
// import { Testimonials } from '../../components/Testimonials/Testimonials';
import s from './MainPage.module.scss';

const MainPage = () => {
  return (
      <Container className={s.main_container}>
        <Hero/>
        {/* <Testimonials /> */}
        <Footer />
      </Container>
  );
};

MainPage.propTypes = {
};

export default MainPage;
