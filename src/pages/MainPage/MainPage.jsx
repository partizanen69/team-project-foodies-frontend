import { React, lazy } from 'react';
import { useOutletContext } from 'react-router-dom';
import Container from 'components/Container/Container';

import s from './MainPage.module.scss';
const Hero = lazy(() => import('../../components/Hero/Hero'));
const Categories = lazy(() => import('../../components/Categories/Categories'));

const MainPage = () => {
  const { openModal } = useOutletContext();

  return (
    <Container className={s.main_container}>
      <Hero openModal={openModal} />
      <Categories />
    </Container>
  );
};

MainPage.propTypes = {};

export default MainPage;
