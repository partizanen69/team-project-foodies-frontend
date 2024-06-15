import { React, lazy } from 'react';
import { useOutletContext } from 'react-router-dom';
import Container from 'components/Container/Container';
import Footer from 'components/Footer/Footer';
import { Testimonials } from '../../components/Testimonials/Testimonials';
import Recipes from 'components/Recipes/Recipes';

import s from './MainPage.module.scss';
const Hero = lazy(() => import('../../components/Hero/Hero'));

const MainPage = () => {
  const { openModal } = useOutletContext();

  return (
    <Container className={s.main_container}>
      <Hero openModal={openModal} />
      <Recipes />
      <Testimonials />
      <Footer />
    </Container>
  );
};

MainPage.propTypes = {};

export default MainPage;
