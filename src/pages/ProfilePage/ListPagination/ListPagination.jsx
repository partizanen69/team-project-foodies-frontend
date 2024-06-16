import { useDispatch, useSelector } from 'react-redux';
import s from './ListPagination.module.scss';
import { selectLimit, selectPage } from '../../../redux/selectors';
import { setPage } from '../../../redux/reducers/listReducer';

const ListPagination = ({ total }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectPage);
  const limit = useSelector(selectLimit);

  const totalPages = Math.ceil(total / limit);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = page => {
    dispatch(setPage(page));
  };

  return (
    totalPages > 1 && (
      <ul className={s.pagination_elements}>
        {pages.map((page, index) => {
          // Always show the first page and the last page
          if (page === 1 || page === totalPages) {
            return (
              <li
                key={page}
                className={`${s.pagination_element} ${
                  currentPage === page ? s.pagination_element_active : ''
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </li>
            );
          }
          // Show 3 nearest pages to the current page
          if (page >= currentPage - 1 && page <= currentPage + 1) {
            return (
              <li
                key={page}
                className={`${s.pagination_element} ${
                  currentPage === page ? s.pagination_element_active : ''
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </li>
            );
          }
          // Insert ellipses where appropriate
          if (
            (page === 2 && currentPage > 3) ||
            (page === totalPages - 1 && currentPage < totalPages - 2)
          ) {
            // Avoid duplicate ellipses
            if (
              (page === 2 && currentPage === 4) ||
              (page === totalPages - 1 && currentPage === totalPages - 3)
            ) {
              return null;
            }
            return (
              <li key={page} className={s.pagination_element}>
                ...
              </li>
            );
          }
          return null;
        })}
      </ul>
    )
  );
};

export default ListPagination;
