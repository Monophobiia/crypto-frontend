import React, { useState } from "react";
import Card from "@components/Card";
import cn from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import styles from "./CoinsList.module.scss";

type CoinsListProps = {
  list: [];
  hasMore: boolean;
  page: number;
  searchString: string;
  currency: string;
  onNext: (value: number) => void;
};

const CoinsList = ({
  list,
  hasMore,
  page,
  searchString,
  currency,
  onNext,
}: CoinsListProps) => {
  return (
    <InfiniteScroll
      dataLength={list.length}
      next={onNext}
      hasMore={hasMore}
      endMessage={
        <p className={styles["coinsList__end-text"]}>
          <b>Yay! You have seen it all.</b>
        </p>
      }
    >
      {list.map(
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
                !searchString ? (
                  <div className={styles.coinsList__price}>
                    <p className={styles["coinsList__price__price-current"]}>
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
                        styles["coinsList__price__price-change"],
                        coin.priceChange > 0
                          ? styles["price-change-gain"]
                          : styles["price-change-loss"]
                      )}
                    >
                      {Number(coin.priceChangePercentage).toFixed(2) + "%"}
                    </p>
                  </div>
                ) : null
              }
            />
          </Link>
        )
      )}
    </InfiniteScroll>
  );
};

export default CoinsList;
