import React, { useEffect } from "react";

import { load } from "@2gis/mapgl";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { Skeleton } from "antd";
import { fetchEvents, setCategory } from "../../store/eventSlice";
import eventDetailsLogo from "../../assets/eventDetailsLogo.png";
import timeLogo from "../../assets/timeLogo.png";
import locationLogo from "../../assets/loactionLogo.png";
import classes from "./EventDetails.module.css";

const EventDetails: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { events, status, currentPage } = useSelector(
    (state: RootState) => state.events
  );

  // const [isExpanded, setIsExpanded] = useState(false);

  const event = events.find((event) => event.id === id);

  const navigate = useNavigate();

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
    localStorage.setItem("currentPage", String(currentPage));
    // console.log("Event Data:", event);
    // console.log("Main Photo URL:", event.external_content[0].main_photo_url);
  }, [currentPage]);

  useEffect(() => {
    load().then((mapglAPI) => {
      const map = new mapglAPI.Map("mapContainer", {
        key: "7698abba-ede9-44c0-92ca-65e87fd7be37",
        center: [event!.point!.lon, event!.point!.lat],
        zoom: 13,
      });

      new mapglAPI.Marker(map, {
        coordinates: [event!.point!.lon, event!.point!.lat],
      });
    });
  }, [currentPage, event]);

  if (status === "loading" || !event) {
    return (
      <div>
        <Skeleton.Image style={{ width: 300, height: 200 }} />
        <Skeleton active paragraph={{ rows: 2 }} />
      </div>
    );
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  // const toggleExpand = () => {
  //   setIsExpanded((prev) => !prev);
  // };

  return (
    <div className={classes.container}>
      <div className={classes.informationContainer}>
        <p
          style={{ color: "#A5A5A5", cursor: "pointer" }}
          onClick={handleGoBack}
        >
          Вернутся назад
        </p>

        <div className={classes.nameBlock}>
          <img style={{ marginBottom: "7px" }} src={eventDetailsLogo} />

          <h1 style={{ color: "white" }}>{event.name}</h1>
          {Array.isArray(event.external_content) &&
            event.external_content.length > 0 && (
              <img
                src={event.external_content[0].main_photo_url}
                alt="Фото события"
                style={{
                  width: "700px",
                  height: "350px",
                  marginBottom: "10px",
                  border: "1px solid white",
                  borderRadius: "10px",
                }}
              />
            )}

          <div className={classes.baseInfo}>
            <div className={classes.addressInfo}>
              <img src={locationLogo} />
              <p style={{ fontWeight: 400, fontSize: "11px" }}>
                {event.address_name}
              </p>
            </div>

            <div className={classes.timeInfo}>
              <img src={timeLogo} />
              <p style={{ fontWeight: 400, fontSize: "11px" }}>17.00 - 22.00</p>
            </div>
          </div>
        </div>

        {/* <div className={classes.infoBlock}>
          <div
            className={`${classes.expandedInfo} ${
              isExpanded ? classes.contentExpanded : ""
            }`}
          >
            <p>{event.point?.lat}</p>
            <p>{event.point?.lon}</p>
            <p>{event.address_comment}</p>
            <p>{event.address_comment}</p>
            <p>{event.address_comment}</p>
            <p>{event.address_comment}</p>
            <p>{event.address_comment}</p>
            <p>{event.address_comment}</p>
            <p>{event.address_comment}</p>
            <p>{event.address_comment}</p>
            <p>{event.address_comment}</p>
            <p>{event.address_comment}</p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            className={classes.moreInfoButtonContainer}
          >
            <button className={classes.toggleButton} onClick={toggleExpand}>
              {isExpanded ? "Скрыть" : "Показать ещё"}
            </button>
          </div>
        </div> */}
      </div>

      <div id="mapContainer" className={classes.mapContainer}>
        <a
          href="https://yandex.by/maps/157/minsk/?ll=27.555691%2C53.902735&z=12"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.mapButton}
        >
          Построить маршрут
        </a>
      </div>
    </div>
  );
};

export default EventDetails;
