import style from "./Today.module.css";

function Today() {
  const d = new Date();
  const day: number = d.getDate();
  const dayTwoValue: string | number =
    String(day).length === 1 ? "0" + day : day;
  const year: number = d.getFullYear();
  const month: number = d.getMonth();
  const monthTwoValue: string | number =
    String(month).length === 1 ? "0" + month : month;
  const weekday: string = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(d);

  return (
    <div className={style["container"]}>
      <div className={style["weekday"]}>{weekday}</div>
      <div className={style["day-mount-year"]}>
        {dayTwoValue}/{monthTwoValue}/{year}
      </div>
    </div>
  );
}
export default Today;
