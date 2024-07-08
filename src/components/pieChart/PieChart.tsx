import style from "./PieChart.module.css";
import { PieChartProps } from "./PieChart.props";

function PieChart({id, name, color, count}: PieChartProps) {
  console.log(color)
  return (
    <div className={style["container"]} key={id}>
        <div className={style["chart-container"]}>
    <div className={style["pie"]} style={{'--percentage': `${count}%`, '--color': color}}>
    <div className={style["inner-circle"]}></div>
    </div>
    <div className={style["label"]} >{count.toFixed(1)}%</div>
  </div>
      <div className={style["title"]}>
        <div className={style["elipse"]} style={{'--color': color}}></div>
        <p className={style["name"]}>{name}</p>
      </div>
    </div>
  );
}
export default PieChart;
