import React from "react";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

interface CardProps {
  id: string;
  image: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ id, image, title, description }) => {
  const { category } = useParams<{ category: string }>();

  return (
    <div className={styles.card}>
      <Link to={`/${category}/${id}`}>
        {" "}
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
      </Link>
    </div>
  );
};

export default Card;
