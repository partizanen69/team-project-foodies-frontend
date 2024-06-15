import { getUserFollowing } from 'api/users';
import ListItems from '../ListItems/ListItems';
import s from './userFollowing.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectList } from '../../../redux/selectors';
import { setList } from '../../../redux/reducers/listReducer';
import { useParams } from 'react-router-dom';

const UserFollowing = props => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const [isLoading, setIsLoading] = useState(true);
  const userList = useSelector(selectList);
  useEffect(() => {
    dispatch(setList([]));
    (async () => {
      try {
        if (!id) {
          return;
        }
        const data = await getUserFollowing({ id, page: 1, limit: 9 });
        dispatch(setList(data.following));
      } catch (error) {
        console.log(error);
      } finally {
        // setIsLoading(false);
      }
    })();
  }, [id, dispatch]);

  return (
    <ListItems
      isRecipeCard={false}
      list={userList}
      isFollowers={props.isFollowers}
    />
  );
};

export default UserFollowing;
