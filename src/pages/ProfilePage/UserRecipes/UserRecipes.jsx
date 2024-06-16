import { getUserRecipes } from 'api/recipes';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectList,
  selectListLoading,
  selectPage,
} from '../../../redux/selectors';
import {
  setIsLoading,
  setList,
  setPage,
} from '../../../redux/reducers/listReducer';
import ListItems from '../ListItems/ListItems';
import ListPagination from '../ListPagination/ListPagination';
import { showError } from 'api/api.utils';
import Loader from 'components/Loader/Loader';
import s from './UserRecipes.module.scss';

const UserRecipes = () => {
  const { id } = useParams();
  const { user } = useSelector(state => state.auth);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const isLoading = useSelector(selectListLoading);

  const dispatch = useDispatch();
  const recipes = useSelector(selectList);
  const currentPage = useSelector(selectPage);
  const [totalRecipes, setTotalRecipes] = useState(0);

  useEffect(() => {}, [dispatch]);

  useEffect(() => {
    if (user && user.id && id) {
      setIsOwnProfile(user.id === id);
    }

    return () => {
      // reset list and page before component unmounts
      dispatch(setList([]));
      dispatch(setPage(1));
    };
  }, [user, id, dispatch]);

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          dispatch(setIsLoading(true));
          const result = await getUserRecipes({
            owner: id,
            page: currentPage,
            limit: 10,
          });
          dispatch(setList(result.recipes));
          setTotalRecipes(result.total);
        }
      } catch (error) {
        showError(error.message);
      } finally {
        dispatch(setIsLoading(false));
      }
    })();
  }, [isOwnProfile, id, currentPage, dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : recipes.length > 0 ? (
        <>
          <ListItems isRecipeCard={true} list={recipes} isFavorite={false} />
          {totalRecipes && <ListPagination total={totalRecipes} />}
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
