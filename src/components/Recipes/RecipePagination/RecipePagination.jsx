// import tools
import PropTypes from 'prop-types';

// import styles
import s from './RecipePagination.module.scss';

const RecipePsginstion = ({ page, limit, action }) => {
  let elCount = [1, 2, 3];
  return (
    <>
      <ul className={s.pagination_elements}>
        {elCount.map(el => {
          return (
            <li
              key={el}
              className={`${s.pagination_element} ${
                el === page ? s.pagination_element_active : ''
              }`}
              onClick={action}
            >
              {el}
            </li>
          );
        })}
      </ul>
    </>
  );
};

RecipePsginstion.propTypes = {
  page: PropTypes.number,
  limit: PropTypes.number,
  action: PropTypes.func,
};

export default RecipePsginstion;
