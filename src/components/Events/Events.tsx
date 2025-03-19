import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  fetchEvents,
  setCategory,
  setPage,
  clearEvents,
} from "../../store/eventSlice";

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
    categories.find((cat) => cat.route === `/${category}`)?.label || "Покушать";

  useEffect(() => {
    if (category && currentCategory !== currentCategoryLabel) {
      dispatch(setCategory(currentCategoryLabel));
      dispatch(setPage(1));
      dispatch(clearEvents());
      dispatch(fetchEvents({ category: currentCategoryLabel, page: 1 }));
    }
  }, [category, currentCategoryLabel, currentCategory, dispatch]);

  useEffect(() => {
    dispatch(clearEvents());
    dispatch(fetchEvents({ category: currentCategory, page: currentPage }));
  }, [dispatch, currentCategory, currentPage]);

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleSearch = (query: string) => {
    if (query) {
      setFilteredEvents(
        events.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
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
          id: item.id,
          title: item.name,
          description: item.address_name,
          image:
            item.external_content?.[0]?.main_photo_url ||
            "https://via.placeholder.com/150",
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
