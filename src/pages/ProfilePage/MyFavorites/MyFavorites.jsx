import { getFavoriteRecipes } from 'api/recipes';
import { useEffect, useState } from 'react';
import RecipeItem from '../RecipeItem/RecipeItem';

import s from '../UserRecipes/UserRecipes.module.scss';
import ListItems from '../ListItems/ListItems';
import ListPagination from '../ListPagination/ListPagination';

const MyFavorites = () => {
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await getFavoriteRecipes(1, 10);

      setTotalRecipes(result.totalRecipes);
      setRecipes(result.recipes);
    })();
  }, [currentPage]);
  return (
    <>
      {recipes.length > 0 ? (
        <>
          <ListItems isRecipeCard={true} list={recipes} />
          <ListPagination total={totalRecipes} currentPage={currentPage} />
        </>
      ) : (
        // <>
        //   <ul className={s.recipes_list}>
        //     {recipes.map(recipe => (
        //       <RecipeItem key={recipe._id} recipe={recipe} />
        //     ))}
        //   </ul>

        //   <div>pagination</div>
        // </>
        <p>
          Nothing has been added to your favorite recipes list yet. Please
          browse our recipes and add your favorites for easy access in the
          future.
        </p>
      )}
    </>
  );
};

export default MyFavorites;
