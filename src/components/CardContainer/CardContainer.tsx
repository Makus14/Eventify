import { useState, useEffect } from "react";
import { Skeleton } from "antd";
import Card from "../Card/Card";
import styles from "./CardContainer.module.css";

interface EventData {
  id: string;
  image: string;
  title: string;
  description: string;
}

interface CardContainerProps {
  data: EventData[];
  loading: boolean;
}

const CardContainer: React.FC<CardContainerProps> = ({ data, loading }) => {
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  useEffect(() => {
    if (data.length === 0) return;

    setAllDataLoaded(false);

    const allPromises = data.map((item) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = item.image;
        img.onload = () => {
          if (item.title && item.description) {
            resolve();
          }
        };

        img.onerror = () => resolve();
      });
    });

    Promise.all(allPromises).then(() => {
      setTimeout(() => {
        setAllDataLoaded(true);
      }, 500);
    });
  }, [data]);

  if (loading || !allDataLoaded) {
    return (
      <div className={styles.container}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={styles.skeleton}>
            <Skeleton.Image style={{ width: 300, height: 200 }} />
            <Skeleton active paragraph={{ rows: 2 }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {data.map((card, index) => (
        <Card
          id={card.id}
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
