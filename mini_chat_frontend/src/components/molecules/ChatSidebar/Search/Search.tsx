// mini_chat_frontend/src/components/molecules/Search/Search.tsx
import React from "react";
import styles from "./Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import Input, { InputVariantEnum } from "@/components/atoms/Input/Input";


interface SearchProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  query: string;
  setQuery: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({
  onChange,
  onFocus,
  query,
  setQuery,
}) => {
  const { t } = useTranslation();

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
        <Input
          onChange={handleChange}
          onFocus={onFocus}
          placeholder={t("chatSidebar.searchPlaceholder")}
          value={query}
          variant={InputVariantEnum.SEARCH}
        />
      </div>
    </div>
  );
};

export default Search;
