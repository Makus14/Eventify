import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { Skeleton } from "antd";
import { fetchEvents, setCategory } from "../../store/eventSlice";

const EventDetails: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { events, status, currentPage } = useSelector(
    (state: RootState) => state.events
  );

  const event = events.find((event) => event.id === id);

  useEffect(() => {
    if (category) {
      const storedCategory = localStorage.getItem("currentCategory");
      if (storedCategory !== category) {
        dispatch(setCategory(category));
      }
      if (status === "idle" || status === "failed") {
        dispatch(fetchEvents({ category, page: currentPage }));
      }
    }
  }, [dispatch, status, category, currentPage]);

  useEffect(() => {
    localStorage.setItem("currentPage", String(currentPage)); // Сохраняем перед переходом
  }, [currentPage]);

  if (status === "loading" || !event) {
    return (
      <div>
        <Skeleton.Image style={{ width: 300, height: 200 }} />
        <Skeleton active paragraph={{ rows: 2 }} />
      </div>
    );
  }

  // Отображаем информацию о событии
  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.address_comment}</p>
      <p>{event.address_name}</p>
      {/* Вы можете добавить другие поля, если они есть */}
    </div>
  );
};

export default EventDetails;
