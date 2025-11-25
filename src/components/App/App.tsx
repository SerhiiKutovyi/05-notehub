import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import SearchBox from '../SearchBox/SearchBox';
import Loading from '../Loading/Loading';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import NoteList from '../NoteList/NoteList';
import fetchNotes from '../../services/noteService';

import css from './App.module.css';
import Pagination from '../Pagination/Pagination';

function App() {
  const [page, setPage] = useState<number>(1);

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', page],
    queryFn: () => fetchNotes(page),

    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  });

  console.log(data);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        {isSuccess && data && data.totalPages > 1 && (
          <Pagination data={data} setPage={setPage} page={page} />
        )}
        {<button className={css.button}>Create note +</button>}
      </header>
      <main>
        {isError && <ErrorMessage error={error} />}
        {isLoading && <Loading />}
        {isSuccess && data && data.totalPages > 1 && (
          <NoteList notes={data.notes} />
        )}
      </main>
    </div>
  );
}

export default App;
