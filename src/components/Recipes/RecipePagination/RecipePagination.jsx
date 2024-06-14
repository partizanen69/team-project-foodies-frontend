// import tools
import { useSelector, useDispatch } from 'react-redux';

import { setPageFilter } from '../../../redux/actions/filtersActions';

// import styles
import s from './RecipePagination.module.scss';

const RecipePagination = () => {
const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);

  let elCount = [1, 2, 3];

  const onPage = (number) => {
    if (filters.page !== number) dispatch(setPageFilter(number))
}

  return (
    <>
      <ul className={s.pagination_elements}>
        {elCount.map((el, index) => {
          return (
            <li
              key={el}
              className={`${s.pagination_element} ${
                el === filters.page ? s.pagination_element_active : ''
              }`}
              onClick={() => onPage(index + 1)}
            >
              {el}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RecipePagination;
