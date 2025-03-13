import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchEvents, setCategory, setPage } from "../../store/eventSlice";

import { categories } from "../TopBarMenu/TopBarMenu";
import RandomLocation from "../RandomLocation/RandomLocation";
import SearchBar from "../SearchBar/SearchBar";
import CardContainer from "../CardContainer/CardContainer";
import PaginationComponent from "../PaginationComponent/PaginationComponent";

const Events: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { events, status, currentCategory, currentPage, total } = useSelector(
    (state: RootState) => state.events
  );

  const [filteredEvents, setFilteredEvents] = useState(events);

  const currentCategoryLabel =
    categories.find((cat: { route: string }) => cat.route === `/${category}`)
      ?.label || "Покушать";

  useEffect(() => {
    if (category && currentCategoryLabel !== currentCategory) {
      dispatch(setCategory(currentCategoryLabel));
    }
  }, [category, currentCategoryLabel, dispatch, currentCategory]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch, currentCategory, currentPage]);

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleSearch = (query: string) => {
    if (query) {
      const filtered = events.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  };

  return (
    <div>
      <RandomLocation />
      <SearchBar
        total={total > 30 ? 30 : total}
        category={currentCategoryLabel}
        onSearch={handleSearch}
      />
      <CardContainer
        data={filteredEvents.map((item) => ({
          image:
            item.external_content?.[0]?.main_photo_url ||
            "https://via.placeholder.com/150",
          title: item.name,
          description: item.address_name,
        }))}
        loading={status === "loading"}
      />
      <PaginationComponent
        currentPage={currentPage}
        pageSize={6}
        onChange={handlePageChange}
        total={total > 30 ? 30 : total}
      />
    </div>
  );
};

export default Events;
