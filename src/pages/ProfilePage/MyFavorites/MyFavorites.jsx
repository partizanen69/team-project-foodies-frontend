import { getFavoriteRecipes } from 'api/recipes';
import { useEffect } from 'react';

import ListItems from '../ListItems/ListItems';
import ListPagination from '../ListPagination/ListPagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavorites,
  selectList,
  selectPage,
} from '../../../redux/selectors';
import { setList, setPage } from '../../../redux/reducers/listReducer';

const MyFavorites = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectList);
  const currentPage = useSelector(selectPage);
  const totalFavorites = useSelector(selectFavorites);

  useEffect(() => {
    (async () => {
      const result = await getFavoriteRecipes({ page: currentPage, limit: 10 });
      dispatch(setList(result.recipes));
      dispatch(setPage(currentPage));
    })();
  }, [currentPage, dispatch]);

  return (
    <>
      {recipes.length > 0 ? (
        <>
          <ListItems isRecipeCard={true} list={recipes} />
          {totalFavorites && <ListPagination total={totalFavorites} />}
        </>
      ) : (
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
