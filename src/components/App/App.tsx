import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '../../services/noteService';
import SearchBox from '../SearchBox/SearchBox';
import Loading from '../Loading/Loading';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';

import css from './App.module.css';

function App() {
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: keepPreviousData,
  });

  const handelSearchBox = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(1);
    },
    300
  );

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} onChange={handelSearchBox} />
        {isSuccess && data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            onPageChange={newPage => setPage(newPage)}
            currentPage={page}
          />
        )}
        {
          <button onClick={openModal} className={css.button}>
            Create note +
          </button>
        }
      </header>
      <main>
        {isError && <ErrorMessage error={error} />}
        {isLoading && <Loading />}
        {isSuccess && data && <NoteList notes={data.notes} />}
      </main>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {<NoteForm page={page} onClose={closeModal} />}
        </Modal>
      )}
    </div>
  );
}

export default App;
