import { useSelector } from 'react-redux';
import s from './RecipeCreatedBy.module.scss';
import { selectCurrentUser } from '../../../redux/selectors';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getAvatarSrc } from '../../../api/api.utils';

export const RecipeCreatedBy = ({ ownerId, name, avatar, popular = false }) => {
  const currentUser = useSelector(selectCurrentUser);
  const { openModal } = useOutletContext();
  const navigate = useNavigate();

  const handleBtnClick = () => {
    if (!currentUser) {
      openModal('sign in');
      return;
    }

    navigate(`/user/${ownerId}/recipies`);
  };

  return (
    <div className={s.recipe_created_by_wrap}>
      <button
        className={classNames(
          s.recipe_created_by,
          popular && s.recipe_created_by_popular
        )}
        onClick={handleBtnClick}
      >
        <div
          className={classNames(
            s.avatar_wrap,
            popular && s.avatar_wrap_popular
          )}
        >
          <img src={getAvatarSrc(avatar)} alt={name} />
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
