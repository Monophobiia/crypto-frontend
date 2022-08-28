import React from "react";
import styles from "@styles/Card.module.scss";

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

export const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  onClick,
}: CardProps) => {
  return (
    <div className={styles.card}>
      <img src={image} className={styles.card__image}></img>
      <span className={styles.card__title}>
        {title}
        <p className={styles.card__subtitle}>{subtitle}</p>
      </span>

      <span className={styles.card__content}>{content}</span>
    </div>
  );
};
