import { getUserRecipes } from 'api/recipes';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectLimit,
  selectList,
  selectListLoading,
  selectPage,
  selectRecipes,
} from '../../../redux/selectors';
import {
  setIsLoading,
  setList,
  setPage,
  setRecipes,
} from '../../../redux/reducers/listReducer';
import ListItems from '../ListItems/ListItems';
import ListPagination from '../ListPagination/ListPagination';
import { showError } from 'api/api.utils';
import Loader from 'components/Loader/Loader';
import s from './UserRecipes.module.scss';

const UserRecipes = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const isLoading = useSelector(selectListLoading);
  const limit = useSelector(selectLimit);
  const recipesList = useSelector(selectList);
  const currentPage = useSelector(selectPage);
  const recipesCount = useSelector(selectRecipes);

  useEffect(() => {}, [dispatch]);

  useEffect(() => {
    if (user && user.id && id) {
      setIsOwnProfile(user.id === id);
    }
  }, [user, id]);

  useEffect(() => {
    return () => {
      // reset list and page before component unmounts
      dispatch(setList([]));
      dispatch(setPage(1));
    };
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          dispatch(setIsLoading(true));
          const result = await getUserRecipes({
            owner: id,
            page: currentPage,
            limit: limit,
          });
          dispatch(setList(result.recipes));
          dispatch(setRecipes(result.total));
        }
      } catch (error) {
        showError(error.message);
      } finally {
        dispatch(setIsLoading(false));
      }
    })();
  }, [isOwnProfile, id, currentPage, limit, dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : recipesList.length > 0 ? (
        <>
          <ListItems
            isRecipeCard={true}
            list={recipesList}
            isFavorite={false}
          />
          {recipesCount && <ListPagination total={recipesCount} />}
        </>
      ) : (
        <p className={s.empty_text}>
          Nothing has been added to your recipes list yet. Please browse our
          recipes and add your favorites for easy access in the future.
        </p>
      )}
    </>
  );
};

export default UserRecipes;
