import React, { useCallback, useEffect, useState } from "react";
import Input from "@components/Input";
import { Link, useParams, useSearchParams } from "react-router-dom";
import styles from "./Search.module.scss";

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  linkOnClick: () => void;
};

export const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  linkOnClick,
}: SearchProps) => {
  const handleChangeValue = (e: string) => {
    onChange(e);
  };

  return (
    <div className={styles.search}>
      <div>
        <Input
          value={value}
          onChange={handleChangeValue}
          placeholder="Search Cryptocurrency"
          className={styles.search__input}
        />
        <span className={styles.search__cancel}>
          <Link
            to="/"
            className={styles.search__cancel__link}
            onClick={linkOnClick}
          >
            Cancel
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Search;
