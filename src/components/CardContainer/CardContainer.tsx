import Card from "../Card/Card";
import styles from "./CardContainer.module.css";

interface EventData {
  image: string;
  title: string;
  description: string;
}

interface CardContainerProps {
  data: EventData[];
}

const CardContainer: React.FC<CardContainerProps> = ({ data }) => {
  const handleCardClick = (title: string) => {
    console.log(`Clicked on card: ${title}`);
  };

  return (
    <div className={styles.container}>
      {data.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
};

export default CardContainer;
