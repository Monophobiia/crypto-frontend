import React, { useEffect, useState } from "react";
import arrowLeft from "assets/arrow_left.png";
import Card from "components/Card";
import Loader from "components/Loader";
import useFetch from "hooks/useFetch";
import cn from "classnames";
import { Link, useParams } from "react-router-dom";
import styles from "./Coin.module.scss";

/* 
    Single chosen coin page.
*/
const Coin: React.FC = () => {
  const { id } = useParams();
  const { result, isError, isLoading }: any = useFetch(`${id}?vs_currency=usd`);

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (result)
    return (
      <div className={styles.coin}>
        <div className={styles.coin__back}>
          <span>
            <Link to="/">
              <img src={arrowLeft} className={styles["coin__arrow-left"]} />
            </Link>
          </span>
          <span>
            <img
              src={result.image.small}
              className={styles["coin__small-image"]}
            />
          </span>
          <span className={styles.coin__name}>{result.name}</span>
          <span className={styles.coin__symbol}>
            ({result.symbol.toUpperCase()})
          </span>
        </div>
        <div className={styles.coin__price}>
          <span className={styles["coin__price__curr-price"]}>
            {result.market_data.current_price.usd}
          </span>
          <span
            className={cn(
              result.market_data.price_change_24h > 0
                ? styles["coin__price__price-change-gain"]
                : styles["coin__price__price-change-loss"],
              styles.coin__price__difference
            )}
          >
            {(result.market_data.price_change_24h > 0 ? "+" : "") +
              Number(result.market_data.price_change_24h).toFixed(3)}
          </span>
          <span
            className={cn(
              result.market_data.price_change_percentage_24h > 0
                ? styles["coin__price__price-change-gain"]
                : styles["coin__price__price-change-loss"]
            )}
          >
            {"(" +
              Number(
                result.market_data.price_change_percentage_24h.toFixed(2)
              ) +
              "%)"}
          </span>
        </div>
        <Card
          image={result.image.large}
          title={result.name}
          subtitle={result.symbol.toUpperCase()}
        />
      </div>
    );

  return <Loader />
};

export default Coin;
