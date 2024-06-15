import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { setPageFilter } from '../../../redux/actions/filtersActions';
import s from './RecipePagination.module.scss';

const RecipePagination = ({ total }) => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);

  const [paginationElements, setPaginationElements] = useState([]);

  const createArray = num => {
    return [...Array(num).keys()].map(i => i + 1);
  };

  const totalPages = parseInt(total, 10);

  const onPage = number => {
    if (filters.page !== number) dispatch(setPageFilter(number));
  };

  useEffect(() => {
    const pages = createArray(totalPages);
    const elements = [];

    if (totalPages <= 3) {
      elements.push(...pages);
    } else {
      elements.push(1);

      if (filters.page > 3) {
        elements.push('...');
      }

      const startPage = Math.max(2, filters.page - 1);
      const endPage = Math.min(totalPages - 1, filters.page + 1);

      for (let i = startPage; i <= endPage; i++) {
        elements.push(i);
      }

      if (filters.page < totalPages - 2) {
        elements.push('...');
      }

      elements.push(totalPages);
    }

    setPaginationElements(elements);
  }, [filters.page, totalPages]);

  return (
    <>
      {paginationElements.length > 1 ? (
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
                className={`${s.pagination_element} ${
                  el === filters.page ? s.pagination_element_active : ''
                }`}
                onClick={() => onPage(el)}
              >
                {el}
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};

RecipePagination.propTypes = {
  total: PropTypes.number.isRequired,
};

export default RecipePagination;
