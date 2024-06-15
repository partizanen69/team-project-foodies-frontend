import { React, lazy } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import Container from 'components/Container/Container';
import Recipes from 'components/Recipes/Recipes'; 
import Categories from 'components/Categories/Categories';

import s from './MainPage.module.scss';
const Hero = lazy(() => import('../../components/Hero/Hero'));

const MainPage = () => {
  const { openModal } = useOutletContext();
  const { category} = useSelector(state => state.filters);

  return (
    <Container className={s.main_container}>
      <Hero openModal={openModal} />
      {category 
        ? <Recipes/>
        : <Categories/>
      }
    </Container>
  );
};

MainPage.propTypes = {};

export default MainPage;
