import React from "react";

import eventifyIcon from "../../../assets/eventifyIcon.svg";
import profileIcon from "../../../assets/profileIcon.png";
import exitIcon from "../../../assets/exitIcon.png";
import classes from "./CategoryNavbar.module.css";

interface Category {
  icon: string;
  label: string;
}

interface CategoryNavbarProps {
  categories: Category[];
}

const CategoryNavbar: React.FC<CategoryNavbarProps> = ({ categories }) => {
  return (
    <div className={classes.navBar}>
      <div className={classes.eventifyTitle}>
        <img
          className={classes.eventifyIcon}
          src={eventifyIcon}
          alt="Eventify icon"
        />
        <h2 style={{ fontWeight: "bold", marginTop: "15px" }}>EVENTIFY</h2>
      </div>

      <div className={classes.category}>
        {categories.map((category, index) => (
          <button key={index} className={classes.categoryButton}>
            <img
              className={classes.categoryIcon}
              src={category.icon}
              alt={category.label}
            />
            <span className={classes.categoryLabel}>{category.label}</span>
          </button>
        ))}
      </div>

      <div className={classes.category} style={{ marginRight: "10px" }}>
        <button className={classes.additionalButton}>
          <img
            className={classes.additionalIcon}
            src={profileIcon}
            alt="Profile icon"
          />
          <span className={classes.additionalText}>Мой профиль</span>
        </button>

        <button className={classes.additionalButton}>
          <img
            className={classes.additionalIcon}
            src={exitIcon}
            alt="Exit icon"
          />
          <span className={classes.additionalText}>Выход</span>
        </button>
      </div>
    </div>
  );
};

export default CategoryNavbar;
