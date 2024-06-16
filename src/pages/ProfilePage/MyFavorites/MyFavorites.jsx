import { getFavoriteRecipes } from 'api/recipes';
import { useEffect } from 'react';

import ListItems from '../ListItems/ListItems';
import ListPagination from '../ListPagination/ListPagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavorites,
  selectLimit,
  selectList,
  selectListLoading,
  selectPage,
} from '../../../redux/selectors';
import {
  setIsLoading,
  setList,
  setPage,
  setTotalUsers,
} from '../../../redux/reducers/listReducer';
import { showError } from 'api/api.utils';
import Loader from 'components/Loader/Loader';
import s from './MyFavorites.module.scss';

const MyFavorites = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectListLoading);
  const recipes = useSelector(selectList);
  const currentPage = useSelector(selectPage);
  const totalFavorites = useSelector(selectFavorites);
  const limit = useSelector(selectLimit);

  useEffect(() => {
    return () => {
      dispatch(setList([])); // Reset list to empty or initial state
      dispatch(setPage(1)); // Reset page to 1 or initial state
      dispatch(setTotalUsers(0));
    };
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(setIsLoading(true));
        const result = await getFavoriteRecipes({
          page: currentPage,
          limit,
        });
        dispatch(setList(result.recipes));
      } catch (error) {
        showError(error.message);
      } finally {
        dispatch(setIsLoading(false));
      }
    })();
  }, [currentPage, limit, dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : recipes.length > 0 ? (
        <>
          <ListItems isRecipeCard={true} list={recipes} isFavorite={true} />
          {totalFavorites && <ListPagination total={totalFavorites} />}
        </>
      ) : (
        <p className={s.empty_text}>
          Nothing has been added to your favorite recipes list yet. Please
          browse our recipes and add your favorites for easy access in the
          future.
        </p>
      )}
    </>
  );
};

export default MyFavorites;
