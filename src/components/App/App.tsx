import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

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
  // const [isDisabled, setIsDisabled] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', page],
    queryFn: () => fetchNotes(page),

    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        {isSuccess && data && data.totalPages > 1 && (
          <Pagination data={data} setPage={setPage} page={page} />
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
        {isSuccess && data && data.totalPages > 1 && (
          <NoteList notes={data.notes} />
        )}
      </main>
      {isModalOpen && (
        <Modal onClose={closeModal}>{<NoteForm onClose={closeModal} />}</Modal>
      )}
    </div>
  );
}

export default App;
