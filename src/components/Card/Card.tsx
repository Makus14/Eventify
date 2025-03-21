import React from "react";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedEvent } from "../../store/eventSlice";
import { AppDispatch } from "../../store/store";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

interface CardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  event: {
    id: string;
    name: string;
    address_name: string;
    external_content?: { main_photo_url: string }[];
    point?: { lat: number; lon: number };
  };
}

const Card: React.FC<CardProps> = ({
  id,
  image,
  title,
  description,
  event,
}) => {
  const { category } = useParams<{ category: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const handleEventClick = () => {
    dispatch(setSelectedEvent(event));
  };

  return (
    <div className={styles.card}>
      <Link to={`/${category}/${id}`} onClick={handleEventClick}>
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
