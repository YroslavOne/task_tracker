import style from "./PieChart.module.css";

function PieChart() {
  return (
    <div className={style["container"]}>
        <div className={style["chart-container"]}>
    <div className={style["pie"]} style={{'--percentage': '20%', '--color': '#4caf50'}}>
    <div className={style["inner-circle"]}></div>
    </div>
    <div className={style["label"]} >10%</div>
  </div>
      <div className={style["title"]}>
        <div className={style["elipse"]} style={{'--color': '#4caf50'}}></div>
        <p className={style["name"]}>Completed</p>
      </div>
    </div>
  );
}
export default PieChart;
