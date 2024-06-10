import { React } from 'react';
import Container from 'components/Container/Container';
import s from '../MainPage/MainPage.module.scss';
import { PathInfo } from '../../components/PathInfo/PathInfo';

const Recipe = () => {
  return (
    <Container className={s.main_container}>
      <PathInfo currentPageName="recipe" />
    </Container>
  );
};

Recipe.propTypes = {};

export default Recipe;
