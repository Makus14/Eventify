import minskImg from "../../assets/minskImg.jpg";
import classes from "./RandomLocation.module.css";

function RandomLocation() {
  return (
    <div className={classes.container}>
      <img className={classes.image} src={minskImg} alt="Minsk image" />
      <button className={classes.button}>
        Подобрать активность наугад в Минске
      </button>
    </div>
  );
}

export default RandomLocation;
