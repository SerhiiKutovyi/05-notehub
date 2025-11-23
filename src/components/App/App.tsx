import { useQuery } from '@tanstack/react-query';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';

import getNotes from '../../services/noteService';
import Loading from '../Loading/Loading';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function App() {
  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  });

  console.log('data', data);
  console.log('error', error);
  console.log('isError', isError);
  console.log('isSuccess', isSuccess);

  return (
    <div>
      <header className={css.toolbar}>
        <SearchBox />
        {isLoading && <Loading />}
        {isError && <ErrorMessage error={error} />}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
    </div>
  );
}

export default App;
