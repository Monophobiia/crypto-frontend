import { useEffect, useState } from "react";
import React from "react";
import CoinsList from "components/CoinsList";
import Header from "components/Header";
import { observer, useLocalStore } from "mobx-react-lite";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQueryParamsStoreInit } from "stores/RootStore/hooks/useQueryParamsStore";
import rootStore from "stores/RootStore/instance";
import CoinsListStore from "../../stores/CoinsListStore";
import styles from "./Coins.module.scss";

/* 
    List of all coins.
*/
const Coins: React.FC = () => {
  const { tab } = useParams();
  const coinsListStore = useLocalStore(() => new CoinsListStore());

  useQueryParamsStoreInit();
  const [searchParams, setSearchParams] = useSearchParams(
    "search=" + rootStore.query.getParam("search")
  );

  const [pageParams, setPageParams] = useSearchParams();

  const searchParamsTostring = (search: URLSearchParams) => {
    return search.toString();
  };

  useEffect(() => {
    coinsListStore.setTab(tab);
    const page = rootStore.query.getParam("page");
    tab !== "searchInput" // Tab changing breaks because of this
      ? setPageParams(page ? `page=${page}` : "page=1")
      : setSearchParams(`search=${rootStore.query.getParam("search")}`);

    coinsListStore.GetCoinsList({
      currency: [{ key: "usd", value: "Market-USD" }],
      page: page,
    });
  }, [coinsListStore, tab]);

  return (
    <div className={styles.coins}>
      <Header
        dropdownValue={coinsListStore.currency}
        dropdownOptions={coinsListStore.currencies}
        onChange={
          tab === "searchInput" ? setSearchParams : coinsListStore.setCurrency
        }
        currentTab={tab}
        searchInputValue={searchParamsTostring(searchParams)}
        linkOnClick={coinsListStore.setClearList}
      />
      <CoinsList
        list={coinsListStore.list}
        hasMore={coinsListStore.hasMore}
        searchString={coinsListStore.searchString}
        currency={coinsListStore.currency}
        onNext={() => {
          setPageParams(`page=${Number(rootStore.query.getParam("page")) + 1}`);
        }}
      />
    </div>
  );
};

export default observer(Coins);
