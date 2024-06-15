import { useDispatch, useSelector } from 'react-redux';
import s from './ListPagination.module.scss';
import { selectPage } from '../../../redux/selectors';
import { setPage } from '../../../redux/reducers/listReducer';

const ListPagination = ({ total }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectPage);

  const totalPages = Math.ceil(total / 10);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = page => {
    dispatch(setPage(page));
  };

  return (
    <ul className={s.pagination_elements}>
      {pages &&
        pages.map(page => (
          <li
            key={page}
            className={`${s.pagination_element} ${
              currentPage === page ? s.pagination_element_active : ''
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </li>
        ))}
    </ul>
  );
};

export default ListPagination;
