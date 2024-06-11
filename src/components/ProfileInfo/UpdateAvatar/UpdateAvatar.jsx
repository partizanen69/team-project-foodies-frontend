import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import s from './UpdateAvatar.module.scss';

export const UpdateAvatar = ({ userId }) => {
  return (
    <label htmlFor="avatar" className={s.btn_add_avatar}>
      <Icon name="icon-plus" width="16" height="16" className={s.plus} />
      <input
        style={{ display: 'none' }}
        type="file"
        id="avatar"
        name="avatar"
        accept=".jpg, .jpeg, .png"
      />
    </label>
  );
};

UpdateAvatar.propTypes = {
  userId: PropTypes.string.isRequired,
};
