import { getUserFollowers } from 'api/users';
import ListItems from '../ListItems/ListItems';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLimit,
  selectList,
  selectListLoading,
  selectPage,
  selectTotalUsers,
} from '../../../redux/selectors';
import {
  setIsLoading,
  setList,
  setPage,
  setTotalUsers,
} from '../../../redux/reducers/listReducer';
import { useParams } from 'react-router-dom';
import { showError } from 'api/api.utils';
import Loader from 'components/Loader/Loader';
import ListPagination from '../ListPagination/ListPagination';
import s from './UserFollowers.module.scss';

const UserFollowers = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isLoading = useSelector(selectListLoading);
  const userList = useSelector(selectList);
  const currentPage = useSelector(selectPage);
  const totalUsers = useSelector(selectTotalUsers);
  const limit = useSelector(selectLimit);

  useEffect(() => {
    dispatch(setList([]));
    dispatch(setPage(1));
    dispatch(setTotalUsers(0));
    return () => {
      dispatch(setList([]));
      dispatch(setPage(1));
      dispatch(setTotalUsers(0));
    };
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      dispatch(setList([]));
      try {
        dispatch(setIsLoading(true));
        const data = await getUserFollowers({ id, page: currentPage, limit });
        dispatch(setTotalUsers(Number(data.total)));
        dispatch(setList(data.followers));
      } catch (error) {
        showError(error.message);
      } finally {
        dispatch(setIsLoading(false));
      }
    })();
  }, [id, currentPage, limit, dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : userList.length > 0 ? (
        <>
          <ListItems isRecipeCard={false} list={userList} />
          {totalUsers > limit && <ListPagination total={totalUsers} />}
        </>
      ) : (
        <p className={s.empty_text}>
          There are currently no followers on your account. Please engage our
          visitors with interesting content and draw their attention to your
          profile.
        </p>
      )}
    </>
  );
};

export default UserFollowers;
