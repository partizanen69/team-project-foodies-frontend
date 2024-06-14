// import components
import Container from 'components/Container/Container';
import NavigationButton from './NavigationButton/NavigationButton';
import MainTitle from 'components/MainTitle/MainTitle';
import Subtitle from 'components/Subtitle/Subtitle';

import s from './Recipes.module.scss';

const Recipes = () => {
  return (
    <Container className={s.recipes_container}>
      <div className={s.recipes_header_container}>
        <NavigationButton title="back"></NavigationButton>
        <MainTitle>desserts</MainTitle>
        <Subtitle>
          Go on a taste journey, where every sip is a sophisticated creative
          chord, and every dessert is an expression of the most refined
          gastronomic desires.
        </Subtitle>
      </div>
    </Container>
  );
};

export default Recipes;
