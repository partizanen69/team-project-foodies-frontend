import { getUserRecipes } from 'api/recipes';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectList, selectPage } from '../../../redux/selectors';
import { setList } from '../../../redux/reducers/listReducer';
import ListItems from '../ListItems/ListItems';
import ListPagination from '../ListPagination/ListPagination';

const UserRecipes = () => {
  const { id } = useParams();
  const { user } = useSelector(state => state.auth);

  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const dispatch = useDispatch();
  const recipes = useSelector(selectList);
  const currentPage = useSelector(selectPage);
  const [totalRecipes, setTotalRecipes] = useState(0);

  useEffect(() => {
    if (user && user.id && id) {
      setIsOwnProfile(user.id === id);
    }
  }, [user, id]);

  useEffect(() => {
    (async () => {
      if (id) {
        const result = await getUserRecipes({
          owner: id,
          page: currentPage,
          limit: 10,
        });
        dispatch(setList(result.recipes));
        setTotalRecipes(result.total);
      }
    })();
  }, [isOwnProfile, id, currentPage, dispatch]);

  return (
    <>
      {recipes.length > 0 ? (
        <>
          <ListItems isRecipeCard={true} list={recipes} />
          {totalRecipes && <ListPagination total={totalRecipes} />}
        </>
      ) : (
        <p>
          Nothing has been added to your recipes list yet. Please browse our
          recipes and add your favorites for easy access in the future.
        </p>
      )}
    </>
  );
};

export default UserRecipes;
