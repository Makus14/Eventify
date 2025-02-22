import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  image: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ image, title, description }) => {
  return (
    <div className={styles.card}>
      <img
        src={image}
        alt={title}
        className={styles.image}
        style={{ display: "block" }}
      />
      <div className={styles.overlay}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default Card;
