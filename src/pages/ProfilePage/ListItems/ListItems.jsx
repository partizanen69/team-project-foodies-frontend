import PropTypes from 'prop-types';
import UserCard from '../UserCard/UserCard';
import RecipeItem from '../RecipeItem/RecipeItem';
import s from './ListItems.module.scss';

const ListItems = ({ isRecipeCard, list, isFavorite }) => {
  return (
    <ul className={isRecipeCard ? s.list_items : ''}>
      {isRecipeCard
        ? list.map(item => (
            <RecipeItem key={item._id} recipe={item} isFavorite={isFavorite} />
          ))
        : list.map(item => <UserCard key={item._id} user={item} />)}
    </ul>
  );
};

ListItems.propTypes = {
  isRecipeCard: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  isFavorite: PropTypes.bool,
};

export default ListItems;
