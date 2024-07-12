import style from "./Today.module.css";
import dayjs from "dayjs";

function Today() {
  const d = new Date();
  const dateNow = dayjs(d).format("DD/MM/YYYY");
  const weekday = dayjs(d).format("dddd");

  return (
    <div className={style["container"]}>
      <div className={style["weekday"]}>{weekday}</div>
      <div className={style["day-mount-year"]}>{dateNow}</div>
    </div>
  );
}
export default Today;
