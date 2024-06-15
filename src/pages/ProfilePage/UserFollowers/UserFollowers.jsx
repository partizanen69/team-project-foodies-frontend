import { getUserFollowers } from 'api/users';
import ListItems from '../ListItems/ListItems';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectList } from '../../../redux/selectors';
import { setList } from '../../../redux/reducers/listReducer';
import { useParams } from 'react-router-dom';

const UserFollowers = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const [isLoading, setIsLoading] = useState(true);
  const userList = useSelector(selectList);
  useEffect(() => {
    (async () => {
      try {
        if (!id) {
          return;
        }
        const data = await getUserFollowers({ id, page: 1, limit: 9 });
        dispatch(setList(data.followers));
      } catch (error) {
        console.log(error);
      } finally {
        // setIsLoading(false);
      }
    })();
  }, [id, dispatch]);
  return <ListItems isRecipeCard={false} list={userList} />;
};

export default UserFollowers;
