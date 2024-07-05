import style from "./Diagram.module.css";
import Image from "../../../public/image/dashboard/diagram.svg";
import PieChart from "../pieChart/PieChart";
import { DaigramProps } from "./Diagram.props";
import { useState } from "react";
import { useDispatch } from "react-redux";

type StateType = { name: string; color: string; value: number };

interface StatusState {
  status: StateType[];
}
interface StatusState {
  status: StateType[];
}

function Diagram({ tasks }: DaigramProps) {
  const statusDefault = [
    {
      name: "Not Started",
      color: "#F21E1E",
      value: 0,
    },
    {
      name: "In Progress",
      color: "#0225FF",
      value: 0,
    },
    {
      name: "Completed",
      color: "#05A301",
      value: 0,
    },
  ];
  const [status, SetStatus] = useState<StatusState>(statusDefault);
 

  return (
    <div>
      <div className={style["title"]}>
        <img src={Image} alt="" />
        <p className={style["todo"]}>Task Status</p>
      </div>
      <div>
        <PieChart />
      </div>
    </div>
  );
}
export default Diagram;
