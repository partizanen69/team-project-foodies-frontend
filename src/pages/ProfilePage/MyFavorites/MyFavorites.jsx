import { getFavoriteRecipes } from 'api/recipes';
import { useEffect } from 'react';

import ListItems from '../ListItems/ListItems';
import ListPagination from '../ListPagination/ListPagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavorites,
  selectList,
  selectListLoading,
  selectPage,
} from '../../../redux/selectors';
import {
  setIsLoading,
  setList,
  setPage,
} from '../../../redux/reducers/listReducer';
import { showError } from 'api/api.utils';
import Loader from 'components/Loader/Loader';

const MyFavorites = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectListLoading);
  const recipes = useSelector(selectList);
  const currentPage = useSelector(selectPage);
  const totalFavorites = useSelector(selectFavorites);

  useEffect(() => {
    return () => {
      dispatch(setList([])); // Reset list to empty or initial state
      dispatch(setPage(1)); // Reset page to 1 or initial state
    };
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(setIsLoading(true));
        const result = await getFavoriteRecipes({
          page: currentPage,
          limit: 10,
        });
        dispatch(setList(result.recipes));
      } catch (error) {
        showError(error.message);
      } finally {
        dispatch(setIsLoading(false));
      }
    })();
  }, [currentPage, dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : recipes.length > 0 ? (
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
