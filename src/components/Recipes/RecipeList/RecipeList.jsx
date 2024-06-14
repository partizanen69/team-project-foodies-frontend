// import tools
import PropTypes from 'prop-types';

// import components
import { RecipeCard } from 'components/RecipeCard/RecipeCard';
import Loader from 'components/Loader/Loader';

// import styles
import s from './RecipeList.module.scss';

const RecipeList = ({recipesList, isLoading, errorMsg}) => {

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : errorMsg ? (
        <div>{errorMsg}</div>
      ) : recipesList && recipesList.length > 0 ? (
        <ul className={s.recipes_list}>
          {recipesList.map(recipe => (
            <li key={recipe._id}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>
      ) : (
        <div>No recipes were found</div>
      )}
    </>
  );
};

RecipeList.propTypes = {
  recipesList: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  errorMsg: PropTypes.string
};

export default RecipeList;
