import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setPageFilter } from '../../../redux/actions/filtersActions';
import s from './RecipePagination.module.scss';

const RecipePagination = ({ total }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const createArray = (num) => {
    return [...Array(num).keys()].map((i) => i + 1);
  };

  const totalPages = parseInt(total, 10);
  const pages = createArray(totalPages);

  const onPage = (number) => {
    if (filters.page !== number) dispatch(setPageFilter(number));
  };

  const paginationElements = [];

  if (totalPages <= 3) {
    paginationElements.push(...pages);
  } else {
    if (filters.page <= 4) {
      paginationElements.push(...pages.slice(0, 5), '...', totalPages);
    } else if (totalPages - filters.page <= 3) {
      paginationElements.push(1, '...', ...pages.slice(totalPages - 5));
    } else {
      paginationElements.push(1, '...', filters.page - 1, filters.page, filters.page + 1, '...', totalPages);
    }
  }

  return (
    <ul className={s.pagination_elements}>
      {paginationElements.map((el, index) => {
        if (el === '...') {
          return (
            <li key={`dots-${index}`} className={s.pagination_dots}>
              {el}
            </li>
          );
        }

        return (
          <li
            key={el}
            className={`${s.pagination_element} ${el === filters.page ? s.pagination_element_active : ''}`}
            onClick={() => onPage(el)}
          >
            {el}
          </li>
        );
      })}
    </ul>
  );
};

RecipePagination.propTypes = {
  total: PropTypes.string.isRequired,
};

export default RecipePagination;
