import s from './ListItems.module.scss';
import RecipePreview from '../RecipePreview/RecipePreview';
import PropTypes from 'prop-types';
import UserCard from '../UserCard/UserCard';

const ListItems = props => {
  const { isRecipeCard, list } = props;
  return (
    <ul>
      {isRecipeCard
        ? list.map(item => <RecipePreview key={item._id} recipe={item} />)
        : list.map(item => <UserCard key={item._id} user={item} />)}
    </ul>
  );
};

ListItems.propTypes = {
  isRecipeCard: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
};

export default ListItems;
