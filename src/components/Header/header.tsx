import React from "react";
import searchImg from "@assets/search.png";
import MultiDropdown from "@components/MultiDropdown";
import Search from "@components/Search";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

type HeaderProps = {
  /* Same as in MultiDropdown */
  dropdownValue: Option[];
  dropdownOptions: Option[];
  onChange: (value: Option[]) => void;
  /* Except for current tab, which is used to style chosen tab link */
  currentTab: string;
  searchInputValue: string;
  linkOnClick: () => void;
};

const Header: React.FC<HeaderProps> = ({
  dropdownOptions,
  dropdownValue,
  onChange,
  currentTab,
  searchInputValue,
  linkOnClick,
}) => {
  if (currentTab === "searchInput")
    return (
      <Search
        value={searchInputValue}
        onChange={onChange}
        linkOnClick={linkOnClick}
      />
    );
  return (
    <header className={styles.header}>
      <div className={styles.header__search}>
        <Link to="/searchInput">
          <img src={searchImg} alt="" className={styles.header__search__img} />
        </Link>
      </div>
      <div className={styles.header__content}>
        <h1 className={styles.header__h1}>Coins</h1>
        <span className={styles["header__content__filter-currency"]}>
          <MultiDropdown
            value={dropdownValue}
            options={dropdownOptions}
            onChange={onChange}
            pluralizeOptions={(elements: Option[]) =>
              elements.map((el: Option) => el.key).join()
            }
          />
        </span>
      </div>
      <div className={styles.header__links}>
        <span className={styles["header__links-all"]}>
          <Link
            to="/"
            className={cn(
              styles.header__link,
              currentTab || styles.header__selected
            )}
          >
            All
          </Link>
        </span>
        <span className={styles["header__links-gainer"]}>
          <Link
            to="/gainerF"
            className={cn(
              styles.header__link,
              currentTab === "gainer" ? styles.header__selected : ""
            )}
          >
            Gainer
          </Link>
        </span>
        <span className={styles["header__links-loser"]}>
          <Link
            to="/loserF"
            className={cn(
              styles.header__link,
              currentTab === "loser" ? styles.header__selected : ""
            )}
          >
            Loser
          </Link>
        </span>
        <span className={cn(styles["header__links-fav"])}>
          <Link to="/favouritesF" className={styles.header__link}>
            Favourites
          </Link>
        </span>
      </div>
    </header>
  );
};

export default Header;
