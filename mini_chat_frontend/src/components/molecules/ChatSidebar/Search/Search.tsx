// src/components/molecules/ChatSidebar/Search/Search.tsx

import React from "react";
import styles from "./Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface SearchProps {
  query: string;
  setQuery: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
}

const Search: React.FC<SearchProps> = ({ query, setQuery, onChange, onFocus }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onChange?.(e); 
  };

  return (
    <div className={styles.contactsHeader}>
      <div className={styles.searchContainer}>
        <span className={styles.searchIcon}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by username or email..."
          value={query}
          onChange={handleChange}
          onFocus={onFocus}
        />
      </div>
    </div>
  );
};

export default Search;
