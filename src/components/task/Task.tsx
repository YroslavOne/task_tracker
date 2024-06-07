import style from "./Task.module.css";
import Menu from "../../../public/image/task/MENU.svg";

function Task() {
  return (
    <div className={style["container"]}>
      <div className={style["top-bar"]}>
        <div
          className={style["status"]}
          style={{ border: "solid 2px rgba(242, 30, 30, 1)" }}
        ></div>
        <img src={Menu} alt="" />
      </div>
      <div className={style["content"]}>
        <div className={style["description"]}>
          <h2>Attend Nischal’s Birthday Party</h2>
          <p>
            Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh
            Elements).....ick up cake from the bakery. (6 PM | Fresh
            Elements).....ick up cake from the bakery. (6 PM | Fresh
            Elements).....ick up cake from the bakery. (6 PM | Fresh
            Elements).....ick up cake from the bakery. (6 PM | Fresh
            Elements).....ick up cake from the bakery. (6 PM | Fresh
            Elements).....ick up cake from the bakery. (6 PM | Fresh
            Elements).....
          </p>
          <div className={style["information"]}>
            <p className={style["priority"]}>
              Priority: <span style={{ color: "blue" }}>Moderate</span>
            </p>
            <p className={style["priority"]}>
              Status: <span style={{ color: "blue" }}>In Progress</span>
            </p>
          </div>
        </div>
        <div className={style["image-date"]}>
          <img
            className={style["image"]}
            src="https://img.goodfon.ru/wallpaper/nbig/a/69/kartinka-3d-dikaya-koshka.webp"
            alt=""
          />
          <p className={style["created"]}>Created on: 20/06/2023</p>
        </div>
      </div>
    </div>
  );
}
export default Task;
