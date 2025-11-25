import css from './SearchBox.module.css';

function SearchBox() {
  return (
    <>
      <input
        className={css.input}
        type="text"
        name="id"
        placeholder="Search notes"
      />
    </>
  );
}
export default SearchBox;
