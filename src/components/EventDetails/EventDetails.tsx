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
import backArrow from "../../assets/backArrow.png";
import classes from "./EventDetails.module.css";

const EventDetails: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { status, currentPage, selectedEvent } = useSelector(
    (state: RootState) => state.events
  );

  // const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      dispatch(setCategory(category));
      if (status === "idle" || status === "failed") {
        dispatch(fetchEvents({ category, page: currentPage }));
      }
    }
  }, [dispatch, status, category, currentPage]);

  useEffect(() => {
    load().then((mapglAPI) => {
      const map = new mapglAPI.Map("mapContainer", {
        key: "7698abba-ede9-44c0-92ca-65e87fd7be37",
        center: [selectedEvent!.point!.lon, selectedEvent!.point!.lat],
        zoom: 13,
      });

      new mapglAPI.Marker(map, {
        coordinates: [selectedEvent!.point!.lon, selectedEvent!.point!.lat],
      });
    });
  }, [currentPage, selectedEvent]);

  if (status === "loading" || !selectedEvent) {
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            marginBottom: "20px",
          }}
        >
          <p
            style={{ color: "#A5A5A5", cursor: "pointer", margin: 0 }}
            onClick={handleGoBack}
          >
            Вернутся назад
          </p>
          <img style={{ height: "17px", width: "20px" }} src={backArrow} />
        </div>

        <div className={classes.nameBlock}>
          <img style={{ marginBottom: "7px" }} src={eventDetailsLogo} />

          <h1 style={{ color: "white" }}>{selectedEvent?.name}</h1>
          {Array.isArray(selectedEvent?.external_content) &&
            selectedEvent.external_content.length > 0 && (
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={selectedEvent?.external_content[0].main_photo_url}
                  alt="Фото события"
                  style={{
                    width: "500px",
                    height: "350px",
                    marginBottom: "10px",
                    border: "1px solid white",
                    borderRadius: "10px",
                  }}
                />
                {selectedEvent.reviews?.general_rating !== undefined &&
                  selectedEvent.reviews?.general_review_count_with_stars !==
                    undefined && (
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        backgroundColor: "rgba(255, 255, 255, 0.75)",
                        height: "40px",
                        width: "80px",
                        padding: "4px 8px",
                        borderRadius: "15px",
                        fontSize: "12px",
                        color: "#fff",
                        pointerEvents: "none",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div>
                        <span style={{ color: "black", fontSize: "30px" }}>
                          ★
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <p
                          style={{
                            color: "black",
                            fontSize: 17,
                            fontWeight: 600,
                            marginBottom: 0,
                          }}
                        >
                          {selectedEvent.reviews?.general_rating}
                        </p>
                        <p
                          style={{
                            color: "black",
                            fontSize: 12,
                            marginBottom: 0,
                          }}
                        >
                          {Number(
                            selectedEvent.reviews
                              ?.general_review_count_with_stars
                          ) > 200
                            ? "200+"
                            : selectedEvent.reviews
                                ?.general_review_count_with_stars}
                        </p>
                      </div>
                    </div>
                  )}
              </div>
            )}

          <div className={classes.baseInfo}>
            <div className={classes.addressInfo}>
              <img src={locationLogo} />
              <p style={{ fontWeight: 400, fontSize: "11px" }}>
                {selectedEvent?.address_name}
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
