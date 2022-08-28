import React from "react";
import { MultiDropdown, Option } from "@components/MultiDropdown/MultiDropdown";
import styles from "@styles/Header.module.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";

type HeaderProps = {
  /* Same as in MultiDropdown */
  dropdownValue: Option[];
  dropdownOptions: Option[];
  onChange: (value: Option[]) => void;
  /* Except for current tab, which is used to style chosen tab link */
  currentTab: string;
};

const Header: React.FC<HeaderProps> = ({
  dropdownOptions,
  dropdownValue,
  onChange,
  currentTab,
}) => (
  <header className={styles.header}>
    <div className={styles.header__content}>
      <h1 className={styles.header__h1}>Coins</h1>
      <span className={styles["header__filter-currency"]}>
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
          className={classNames(
            styles.header__link,
            currentTab ? "" : styles.selected
          )}
        >
          All
        </Link>
      </span>
      <span className={styles["header__links-gainer"]}>
        <Link
          to="/gainer"
          className={classNames(
            styles.header__link,
            currentTab === "gainer" ? styles.selected : ""
          )}
        >
          Gainer
        </Link>
      </span>
      <span className={styles["header__links-loser"]}>
        <Link
          to="/loser"
          className={classNames(
            styles.header__link,
            currentTab === "loser" ? styles.selected : ""
          )}
        >
          Loser
        </Link>
      </span>
      <span
        className={classNames(
          styles["header__links-fav"],
          currentTab ? "" : ""
        )}
      >
        <Link to="/favourites" className={styles.header__link}>
          Favourites
        </Link>
      </span>
    </div>
  </header>
);

export default Header;