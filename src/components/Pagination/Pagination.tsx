import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

import type { NotesProps } from '../../services/noteService';

interface PaginateProps {
  data: NotesProps | undefined;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}

function Pagination({ data, setPage, page }: PaginateProps) {
  return (
    <>
      <ReactPaginate
        pageCount={data?.totalPages ?? 0}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setPage(selected + 1)}
        forcePage={page - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
export default Pagination;
