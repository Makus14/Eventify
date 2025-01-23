import CategoryNavbar from "./CategoryNavbar/CategoryNavbar";

import eatIcon from "../../assets/eatIcon.svg";
import cinemaIcon from "../../assets/cinemaIcon.svg";
import bowlingIcon from "../../assets/bowlingIcon.svg";
import sportIcon from "../../assets/sportIcon.svg";
import saunaIcon from "../../assets/saunaIcon.svg";
import activeRestIcon from "../../assets/activeRestIcon.svg";
import drinkIcon from "../../assets/drinkIcon.svg";

const categories = [
  { icon: eatIcon, label: "Покушать" },
  { icon: cinemaIcon, label: "Кинотеатры" },
  { icon: bowlingIcon, label: "Боулинг" },
  { icon: sportIcon, label: "Спорт" },
  { icon: saunaIcon, label: "Сауна" },
  { icon: activeRestIcon, label: "Активный отдых" },
  { icon: drinkIcon, label: "Выпить" },
];

function TopBarMenu() {
  return <CategoryNavbar categories={categories} />;
}

export default TopBarMenu;
