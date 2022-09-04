import React from "react";
import styles from "./Card.module.scss";

type CardProps = {
  /** Image URL */
  image: string;
  /** Card title */
  title: React.ReactNode;
  /** Card subtitle */
  subtitle: React.ReactNode;
  /** Card content (footer/side), can be empty */
  content?: React.ReactNode;
  /** Card click event */
  onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  onClick,
}: CardProps) => {
  return (
    <div className={styles.card}>
      <img src={image} className={styles.card__image} />
      <span className={styles.card__title}>
        {title}
        <p className={styles.card__subtitle}>{subtitle}</p>
      </span>

      <span className={styles.card__content}>{content}</span>
    </div>
  );
};

export default React.memo(Card);
