import { useEffect, useState } from "react";
import React from "react";
import CoinsList from "@components/CoinsList";
import Header from "@components/Header";
import { useQueryParamsStoreInit } from "@stores/RootStore/hooks/useQueryParamsStore";
import rootStore from "@stores/RootStore/instance";
import { observer, useLocalStore } from "mobx-react-lite";
import { Link, useParams, useSearchParams } from "react-router-dom";
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

  useEffect(() => {
    const page = rootStore.query.getParam("page");
    tab !== "searchInput"
      ? setPageParams(page ? `page=${page}` : "page=1")
      : setSearchParams(`search=${rootStore.query.getParam("search")}`);

    coinsListStore.GetCoinsList({
      currency: [{ key: "usd", value: "Market-USD" }],
      page: 1,
      tab: tab,
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
        searchInputValue={searchParams}
        linkOnClick={coinsListStore.setClearList}
      />
      <CoinsList
        list={coinsListStore.list}
        hasMore={coinsListStore.hasMore}
        page={coinsListStore.page}
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
