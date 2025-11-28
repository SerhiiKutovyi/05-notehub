import css from './SearchBox.module.css';

interface SearchBoxProp {
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBox({ search, onChange }: SearchBoxProp) {
  return (
    <>
      <input
        className={css.input}
        type="text"
        name="id"
        placeholder="Search notes"
        defaultValue={search}
        onChange={onChange}
      />
    </>
  );
}
export default SearchBox;
