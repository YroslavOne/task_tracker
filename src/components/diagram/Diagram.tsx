import style from "./Diagram.module.css";
import Image from "../../../public/image/dashboard/diagram.svg";
import PieChart from "../pieChart/PieChart";
import { DaigramProps } from "./Diagram.props";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchCountedStatuses } from "../../store/statuses.slice";

type StateType = { name: string; color: string; value: number };

interface StatusState {
  status: StateType[];
}
interface StatusState {
  status: StateType[];
}

function Diagram({ tasks }: DaigramProps) {
  const dispatch = useDispatch<AppDispatch>();
  const statuses = useSelector((s: RootState) => s.statuses.statuses);

  return (
    <div>
      <div className={style["title"]}>
        <img src={Image} alt="" />
        <p className={style["todo"]}>Task Status</p>
      </div>
      <div className={style["container-pie"]}>
        {statuses.map((status, index) => (
          <PieChart
          key={index}
            id={index}
            name={status.name}
            color={status.color}
            count={(status.valueCounted / tasks?.length) * 100}
          />
        ))}
      </div>
    </div>
  );
}
export default Diagram;
