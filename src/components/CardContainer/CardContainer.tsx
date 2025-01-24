import React from "react";
import styles from "./CardContainer.module.css";
import Card from "../Card/Card";

const mockData = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5N_azcdtwehmo4f5g6REz_itFOSplD74HrA&s",
    title: "Garage food&coffee, кафе",
    description: "This is a description for Card 1.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5N_azcdtwehmo4f5g6REz_itFOSplD74HrA&s",
    title: "Garage food&coffee, кафе",
    description: "This is a description for Card 2.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5N_azcdtwehmo4f5g6REz_itFOSplD74HrA&s",
    title: "Garage food&coffee, кафе",
    description: "This is a description for Card 3.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5N_azcdtwehmo4f5g6REz_itFOSplD74HrA&s",
    title: "Garage food&coffee, кафе",
    description: "This is a description for Card 1.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5N_azcdtwehmo4f5g6REz_itFOSplD74HrA&s",
    title: "Garage food&coffee, кафе",
    description: "This is a description for Card 2.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5N_azcdtwehmo4f5g6REz_itFOSplD74HrA&s",
    title: "Garage food&coffee, кафе",
    description: "This is a description for Card 3.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5N_azcdtwehmo4f5g6REz_itFOSplD74HrA&s",
    title: "Garage food&coffee, кафе",
    description: "This is a description for Card 2.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5N_azcdtwehmo4f5g6REz_itFOSplD74HrA&s",
    title: "Garage food&coffee, кафе",
    description: "This is a description for Card 3.",
  },
];

const CardContainer: React.FC = () => {
  const handleCardClick = (title: string) => {
    console.log(`Clicked on card: ${title}`);
  };

  return (
    <div className={styles.container}>
      {mockData.map((card, index) => (
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
