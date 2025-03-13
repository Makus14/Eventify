import CategoryNavbar from "./CategoryNavbar/CategoryNavbar";

import eatIcon from "../../assets/eatIcon.svg";
import cinemaIcon from "../../assets/cinemaIcon.svg";
import bowlingIcon from "../../assets/bowlingIcon.svg";
import sportIcon from "../../assets/sportIcon.svg";
import saunaIcon from "../../assets/saunaIcon.svg";
import activeRestIcon from "../../assets/activeRestIcon.svg";
import drinkIcon from "../../assets/drinkIcon.svg";

// eslint-disable-next-line react-refresh/only-export-components
export const categories = [
  { icon: eatIcon, label: "Покушать", route: "/eat" },
  { icon: cinemaIcon, label: "Кинотеатры", route: "/cinema" },
  { icon: bowlingIcon, label: "Боулинг", route: "/bowling" },
  { icon: sportIcon, label: "Спорт", route: "/sport" },
  { icon: saunaIcon, label: "Сауна", route: "/sauna" },
  { icon: activeRestIcon, label: "Активный досуг", route: "/activeRest" },
  { icon: drinkIcon, label: "Выпить", route: "/drink" },
];

function TopBarMenu() {
  return <CategoryNavbar categories={categories} />;
}

export default TopBarMenu;
