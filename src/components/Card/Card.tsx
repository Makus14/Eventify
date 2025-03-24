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
    reviews?: {
      general_rating: string;
      general_review_count_with_stars: string;
    };
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
        <img
          src={image}
          alt={title}
          className={styles.image}
          style={{ display: "block" }}
        />
        {event.reviews?.general_rating !== undefined &&
          event.reviews?.general_review_count_with_stars !== undefined && (
            <div
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.75)",
                height: "40px",
                width: "80px",
                padding: "4px 8px",
                borderRadius: "15px",
                fontSize: "12px",
                color: "#fff",
                pointerEvents: "none",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div>
                <span style={{ color: "black", fontSize: "30px" }}>★</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    color: "black",
                    fontSize: 17,
                    fontWeight: 600,
                    marginBottom: 0,
                  }}
                >
                  {event.reviews?.general_rating}
                </p>
                <p style={{ color: "black", fontSize: 12, marginBottom: 0 }}>
                  {Number(event.reviews?.general_review_count_with_stars) > 200
                    ? "200+"
                    : event.reviews?.general_review_count_with_stars}
                </p>
              </div>
            </div>
          )}

        <div className={styles.overlay}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
