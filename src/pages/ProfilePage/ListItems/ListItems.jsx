import PropTypes from 'prop-types';
import UserCard from '../UserCard/UserCard';
import RecipeItem from '../RecipeItem/RecipeItem';
import s from './ListItems.module.scss';
import ListPagination from '../ListPagination/ListPagination';

const ListItems = ({ isRecipeCard, list }) => {
  return (
    <ul className={s.list_items}>
      {isRecipeCard
        ? list.map(item => <RecipeItem key={item._id} recipe={item} />)
        : list.map(item => <UserCard key={item._id} user={item} />)}
    </ul>
  );
};

ListItems.propTypes = {
  isRecipeCard: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
};

export default ListItems;
