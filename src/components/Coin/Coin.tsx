import React, { useEffect, useState } from "react";
import { Card } from "@components/Card/Card";
import styles from "@styles/Coin.module.scss";
import axios from "axios";
import classnames from "classnames";
import { Link, useParams } from "react-router-dom";
import arrow_left from "../../assets/arrow_left.png";

/* 
    Single chosen coin page.
*/
const Coin: React.FC = () => {
  const { id } = useParams();

  const [coin, setCoin] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/${id}?vs_currency=usd`,
      });

      setCoin(result.data);
    };

    fetch();
  }, []);

  if (coin.id)
    return (
      <div className={styles.coin}>
        <div className={styles.coin__back}>
          <span>
            <Link to="/">
              <img src={arrow_left} className={styles["coin__arrow-left"]} />
            </Link>
          </span>
          <span>
            <img
              src={coin.image.small}
              className={styles["coin__small-image"]}
            />
          </span>
          <span className={styles.coin__name}>{coin.name}</span>
          <span className={styles.coin__symbol}>
            ({coin.symbol.toUpperCase()})
          </span>
        </div>
        <div className={styles.coin__price}>
          <span className={styles["coin__price__curr-price"]}>
            {coin.market_data.current_price.usd}
          </span>
          <span
            className={classnames(
              coin.market_data.price_change_24h > 0
                ? styles["coin__price__price-change-gain"]
                : styles["coin__price__price-change-loss"],
              styles.coin__price__difference
            )}
          >
            {(coin.market_data.price_change_24h > 0 ? "+" : "") +
              Number(coin.market_data.price_change_24h).toFixed(3)}
          </span>
          <span
            className={classnames(
              coin.market_data.price_change_percentage_24h > 0
                ? styles["coin__price__price-change-gain"]
                : styles["coin__price__price-change-loss"]
            )}
          >
            {"(" +
              Number(coin.market_data.price_change_percentage_24h.toFixed(2)) +
              "%)"}
          </span>
        </div>
        <Card
          image={coin.image.large}
          title={coin.name}
          subtitle={coin.symbol.toUpperCase()}
        />
      </div>
    );
};

export default Coin;
