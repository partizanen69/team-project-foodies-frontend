import { useSelector } from 'react-redux';
import s from './RecipeCreatedBy.module.scss';
import { selectCurrentUser } from '../../../redux/selectors';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getUserDetailsById } from 'api/users';
import Loader from 'components/Loader/Loader';

export const RecipeCreatedBy = ({ ownerId, popular = false }) => {
  const currentUser = useSelector(selectCurrentUser);
  const { openModal } = useOutletContext();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { result } = await getUserDetailsById(ownerId);
        setIsLoading(false);
        setUserDetails(result);
      } catch (err) {
        setIsLoading(false);
        setErrorMsg(err.message);
      }
    })();
  }, [ownerId]);

  const handleBtnClick = () => {
    if (!currentUser) {
      openModal('sign in');
      return;
    }

    navigate(`/user/${ownerId}`);
  };

  const avatarPlaceholder = process.env.PUBLIC_URL + '/avatar-placeholder.svg';
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : errorMsg ? (
        <div>{errorMsg}</div>
      ) : (
        <div className={s.recipe_created_by_wrap}>
          <button className={s.recipe_created_by} onClick={handleBtnClick}>
            <div className={s.avatar_wrap}>
              <img
                src={userDetails.avatarURL || avatarPlaceholder}
                alt={userDetails.name}
              />
            </div>
            <div className={s.name_wrap}>
              {!popular && <p className={s.created_by}>Created by:</p>}
              <p className={s.name}>{userDetails.name}</p>
            </div>
          </button>
        </div>
      )}
    </>
  );
};

RecipeCreatedBy.propTypes = {
  ownerId: PropTypes.string.isRequired,
  popular: PropTypes.bool,
};
