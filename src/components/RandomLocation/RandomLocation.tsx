import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setSelectedEvent } from "../../store/eventSlice";
import apiClient from "../../api/apiClient";
import minskImg from "../../assets/minskImg.jpeg";
import minskImg2 from "../../assets/minskImage2.jpg";
import minskImg3 from "../../assets/minskImage3.jpeg";
import minskImg4 from "../../assets/minskImage4.jpg";
import loadingEvent from "../../assets/loadingEvent.gif";
import classes from "./RandomLocation.module.css";

const API_KEY = import.meta.env.VITE_API_KEY;

const images = [minskImg, minskImg2, minskImg3, minskImg4];

interface EventItem {
  id: string;
  name: string;
  address_name: string;
  external_content?: { main_photo_url: string }[];
}

function RandomLocation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [randomEvent, setRandomEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeoutCleared, setTimeoutCleared] = useState(false);

  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const fetchRandomEvent = async () => {
    setLoading(true);
    setRandomEvent(null);
    setTimeoutCleared(false);
    setTimerStarted(true);

    let randomPage;
    let requestCategory;

    if (category === "eat") {
      requestCategory = "Покушать";
    } else if (category === "cinema") {
      requestCategory = "Кинотеатры";
    } else if (category === "bowling") {
      requestCategory = "Боулинг";
    } else if (category === "sport") {
      requestCategory = "Спорт";
    } else if (category === "sauna") {
      requestCategory = "Сауна";
    } else if (category === "activeRest") {
      requestCategory = "Активный досуг";
    } else if (category === "drink") {
      requestCategory = "Выпить";
    }

    if (category === "cinema") {
      randomPage = Math.floor(Math.random() * 4) + 1;
    } else if (category === "bowling") {
      randomPage = Math.floor(Math.random() * 1) + 1;
    } else {
      randomPage = Math.floor(Math.random() * 5) + 1;
    }

    try {
      const response = await apiClient.get("items", {
        params: {
          q: requestCategory,
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
  };

  useEffect(() => {
    if (timerStarted && !timeoutCleared) {
      const timer = setTimeout(() => {
        setLoading(false);
        setTimeoutCleared(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [timerStarted, timeoutCleared]);

  const openModal = () => {
    setIsModalOpen(true);
    setTimeoutCleared(false);
    fetchRandomEvent();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRandomEvent(null);
    setLoading(false);
    setTimerStarted(false);
  };

  const handleImageClick = () => {
    if (randomEvent) {
      dispatch(setSelectedEvent(randomEvent));
      navigate(`/${category}/${randomEvent.id}`);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.slider}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Minsk image"
            className={`${classes.image} ${
              index === currentIndex ? classes.active : ""
            }`}
          />
        ))}
      </div>

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
              <img
                src={loadingEvent}
                alt="Загрузка..."
                className={classes.loadingImage}
              />
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
