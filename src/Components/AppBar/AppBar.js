import { useState } from "react";
import styles from "./AppBar.module.css";

const AppBar = ({ onChange }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onChange(query);
    setQuery("");
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.searchForm_button}>
          <span className={styles.searchForm_button_label}>Search</span>
        </button>

        <input
          className={styles.searchForm_input}
          type="text"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default AppBar;
