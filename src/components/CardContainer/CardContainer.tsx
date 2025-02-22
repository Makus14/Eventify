import { useState, useEffect } from "react";
import { Skeleton } from "antd";
import Card from "../Card/Card";
import styles from "./CardContainer.module.css";

interface EventData {
  image: string;
  title: string;
  description: string;
}

interface CardContainerProps {
  data: EventData[];
  loading: boolean;
}

const CardContainer: React.FC<CardContainerProps> = ({ data, loading }) => {
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    if (data.length === 0) return;

    setAllImagesLoaded(false);

    const imagePromises = data.map((item) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = item.image;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(imagePromises).then(() => {
      setAllImagesLoaded(true);
    });
  }, [data]);

  return (
    <div className={styles.container}>
      {loading || !allImagesLoaded
        ? Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.skeleton}>
              <Skeleton.Image style={{ width: 300, height: 200 }} />
              <Skeleton active paragraph={{ rows: 2 }} />
            </div>
          ))
        : data.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
            />
          ))}
    </div>
  );
};

export default CardContainer;
