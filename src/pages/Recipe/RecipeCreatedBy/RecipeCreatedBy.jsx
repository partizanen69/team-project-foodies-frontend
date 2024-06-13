import { useSelector } from 'react-redux';
import s from './RecipeCreatedBy.module.scss';
import { selectCurrentUser } from '../../../redux/selectors';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PropTypes from 'prop-types';

export const RecipeCreatedBy = ({ ownerId, name, avatar, popular = false }) => {
  const currentUser = useSelector(selectCurrentUser);
  const { openModal } = useOutletContext();
  const navigate = useNavigate();

  const handleBtnClick = () => {
    if (!currentUser) {
      openModal('sign in');
      return;
    }

    navigate(`/user/${ownerId}`);
  };

  const avatarPlaceholder = process.env.PUBLIC_URL + '/avatar-placeholder.svg';
  return (
    <div className={s.recipe_created_by_wrap}>
      <button className={s.recipe_created_by} onClick={handleBtnClick}>
        <div className={s.avatar_wrap}>
          <img src={avatar || avatarPlaceholder} alt={name} />
        </div>
        <div className={s.name_wrap}>
          {!popular && <p className={s.created_by}>Created by:</p>}
          <p className={s.name}>{name}</p>
        </div>
      </button>
    </div>
  );
};

RecipeCreatedBy.propTypes = {
  ownerId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  popular: PropTypes.bool,
};
