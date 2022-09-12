import { useEffect, useState } from "react";
import React from "react";
import Card from "@components/Card";
import Header from "@components/Header";
import RawData from "@types/RawData";
import axios from "axios";
import cn from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useParams } from "react-router-dom";
import styles from "./Coins.module.scss";

/* 
    List of all coins.
*/
const Coins: React.FC = () => {
  const { tab } = useParams(),
    [currency, setCurrency] = useState([{ key: "usd", value: "Market-USD" }]),
    [coins, setCoins] = useState([]),
    [page, setPage] = useState(1),
    [hasMore, setHasMore] = useState(true),
    currencies = [
      { key: "usd", value: "Market-USD" },
      { key: "rub", value: "Market-RUB" },
      { key: "eur", value: "Market-EUR" },
    ];

  const dataNormalizer = (data: {}) => {
    return data.map((raw: RawData) => ({
      id: raw.id,
      image: raw.image,
      title: raw.name,
      subtitle: raw.symbol,
      price: raw.current_price,
      priceChange: raw.price_change_24h,
      priceChangePercentage: raw.price_change_percentage_24h,
    }));
  };

  /* Coins list store */
  useEffect(() => {
    const fetch = async (currency: {}, page: number) => {
      const result = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.key}&per_page=50&page=${page}`,
      });

      if (result.data.length === 0) {
        setHasMore(false);
      }

      setCoins(
        coins
          /* Using concat to add new values to existing ones,
         required for proper infinite scrolling */
          .concat(dataNormalizer(result.data))
          /* Reversing coins list, so that added values go first after we change currency */
          .reverse()
          /* Filtering duplicate ids, and removing all except new ones */
          .filter(
            /* Simplier solution:
             for each given array item check if there's a duplicate on id property, 
             return it's index and remove it with filter  */
            (item, index, array) =>
              array.findIndex((indexItem) => indexItem.id === item.id) === index
          )
          /* Reversing again to save initial order */
          .reverse()
          /* Filtering by chosen tab */
          .filter((item) =>
            tab === "gainer"
              ? item.priceChange > 0
              : tab === "loser"
              ? item.priceChange < 0
              : item
          )
      );
    };

    fetch(currency[0], page);
  }, [currency, page, tab]);

  return (
    <div className={styles.coins}>
      <Header
        dropdownValue={currency}
        dropdownOptions={currencies}
        onChange={setCurrency}
        currentTab={tab}
      />
      <InfiniteScroll
        dataLength={coins.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        endMessage={
          <p className={styles["coins__end-text"]}>
            <b>Yay! You have seen it all.</b>
          </p>
        }
      >
        {coins.map(
          (coin: {
            id: number;
            image: string;
            title: string;
            subtitle: string;
            price: number;
            priceChange: number;
            priceChangePercentage: number;
          }) => (
            <Link to={`/coin/${coin.id}`}>
              <Card
                image={coin.image}
                title={coin.title}
                subtitle={coin.subtitle.toUpperCase()}
                content={
                  <div className={styles.coins__price}>
                    <p className={styles["coins__price__price-current"]}>
                      {/* Placeholder for currency symbol, there will be a more elegant solution in the future */}
                      {currency[0].key === "usd"
                        ? "$"
                        : currency[0].key === "rub"
                        ? "₽"
                        : currency[0].key === "eur"
                        ? "€"
                        : ""}
                      {Number(coin.price).toFixed(2)}
                    </p>
                    <p
                      className={cn(
                        styles["coins__price__price-change"],
                        coin.priceChange > 0
                          ? styles["price-change-gain"]
                          : styles["price-change-loss"]
                      )}
                    >
                      {Number(coin.priceChangePercentage).toFixed(2) + "%"}
                    </p>
                  </div>
                }
              />
            </Link>
          )
        )}
      </InfiniteScroll>
    </div>
  );
};

export default Coins;
