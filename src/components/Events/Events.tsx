import { useState } from "react";
import { useParams } from "react-router-dom";

import RandomLocation from "../RandomLocation/RandomLocation";
import SearchBar from "../SearchBar/SearchBar";
import CardContainer from "../CardContainer/CardContainer";
import PaginationComponent from "../PaginationComponent/PaginationComponent";

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
    description: "This is a description for Card 4.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5N_azcdtwehmo4f5g6REz_itFOSplD74HrA&s",
    title: "Garage food&coffee, кафе",
    description: "This is a description for Card 5.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5N_azcdtwehmo4f5g6REz_itFOSplD74HrA&s",
    title: "Garage food&coffee, кафе",
    description: "This is a description for Card 6.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5N_azcdtwehmo4f5g6REz_itFOSplD74HrA&s",
    title: "Garage food&coffee, кафе",
    description: "This is a description for Card 7.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5N_azcdtwehmo4f5g6REz_itFOSplD74HrA&s",
    title: "Garage food&coffee, кафе",
    description: "This is a description for Card 8.",
  },
];

const Events: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = mockData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <RandomLocation />
      <SearchBar total={mockData.length} category={category!} />
      <CardContainer data={paginatedData} />
      <PaginationComponent
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={handlePageChange}
        total={mockData.length}
      />
    </div>
  );
};

export default Events;
