import { useEffect } from "react";

import { NavLink } from "react-router-dom";
import eventifyImage from "../../assets/imageEventify.png";
import eventifyLogo from "../../assets/eventifyLogo.png";
import classes from "./Eventify.module.css";

const Eventify = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleTelegramClick = () => {
    window.open("https://example.com", "_blank");
  };

  return (
    <div className={classes.container}>
      <div className={classes.telegramIconContainer}>
        <span
          className={classes.telegramIconOption}
          onClick={handleTelegramClick}
        >
          <img style={{ width: "300px" }} src={eventifyLogo} />
        </span>
        <div className={classes.tooltip}>Подписывайся на телеграм!</div>
      </div>
      <div className={classes.infoContainer}>
        <img style={{ width: "200px" }} src={eventifyImage} />
        <p className={classes.mainText}>
          Добро пожаловать в приложение Eventify!
        </p>
        <p className={classes.additionalText}>
          Здесь ты найдешь много интересных мест Минска
        </p>
        <NavLink
          style={{ textDecoration: "none", marginTop: "20px" }}
          to="/eat"
        >
          <button className={classes.buttonStyles}>Начать!</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Eventify;
