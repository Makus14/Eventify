import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setSelectedEvent } from "../../store/eventSlice";
import apiClient from "../../api/apiClient";
import minskImg from "../../assets/minskImg.jpeg";
import classes from "./RandomLocation.module.css";

const API_KEY = import.meta.env.VITE_API_KEY;

interface EventItem {
  id: string;
  name: string;
  address_name: string;
  external_content?: { main_photo_url: string }[];
}

function RandomLocation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [randomEvent, setRandomEvent] = useState<EventItem | null>(null);
  const { category } = useParams<{ category: string }>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const fetchRandomEvent = async () => {
    setLoading(true);
    setRandomEvent(null);
    const randomPage = Math.floor(Math.random() * 5) + 1;

    try {
      const response = await apiClient.get("items", {
        params: {
          q: category,
          fields: "items.external_content,items.point",
          location: "27.561831,53.900601",
          key: API_KEY,
          page_size: 6,
          page: randomPage,
          has_photos: true,
        },
      });

      const events = response.data?.result?.items || [];
      if (events.length > 0) {
        const randomIndex = Math.floor(Math.random() * events.length);
        setRandomEvent(events[randomIndex]);
      } else {
        console.warn("API вернул пустой массив событий.");
        setRandomEvent(null);
      }
    } catch (error) {
      console.error("Ошибка загрузки события:", error);
      setRandomEvent(null);
    }

    setLoading(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    fetchRandomEvent();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRandomEvent(null);
  };

  const handleImageClick = () => {
    if (randomEvent) {
      dispatch(setSelectedEvent(randomEvent));
      navigate(`/${category}/${randomEvent.id}`);
    }
  };

  return (
    <div className={classes.container}>
      <img className={classes.image} src={minskImg} alt="Minsk image" />
      <button className={classes.button} onClick={openModal}>
        Подобрать активность наугад в Минске
      </button>

      {isModalOpen && (
        <div className={classes.modalOverlay} onClick={closeModal}>
          <div
            className={classes.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {loading ? (
              <p>Загрузка...</p>
            ) : randomEvent ? (
              <>
                <h2>{randomEvent.name}</h2>
                <p>{randomEvent.address_name}</p>
                <img
                  src={
                    randomEvent.external_content?.[0]?.main_photo_url ||
                    "https://via.placeholder.com/150"
                  }
                  alt={randomEvent.name}
                  className={classes.modalImage}
                  onClick={handleImageClick}
                />
              </>
            ) : (
              <p>Событие не найдено</p>
            )}
            <button className={classes.closeButton} onClick={closeModal}>
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RandomLocation;
