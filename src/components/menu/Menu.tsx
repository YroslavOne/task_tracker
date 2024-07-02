import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ButtonSquare from "../buttonSquare/ButtonSquare";
import style from "./Menu.module.css";
import Bell from "./../../../public/image/menu/top/bell.svg";
import Loop from "../../../public/image/menu/top/Search.svg";
import Calendar from "../../../public/image/menu/top/calendar.svg";
import Today from "./component/Today";
import { taskActions } from "../../store/tasks.slice";
import DatePeriod from "../datePeriod/DatePeriod";

function Menu() {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const fetchValueSearch = () => {
    dispatch(taskActions.filterSearch({ search: searchValue }));
  };

  const handleCalendarOpen = () => {
    setOpen(true);
  };

  const handleCalendarClose = () => {
    setOpen(false);
  };

  return (
    <div className={style["container"]}>
      <div className={style["logo"]}>
        Dash<span>board</span>
      </div>
      <div className={style["search"]}>
        <input
          placeholder="Search your task here..."
          className={style["input"]}
          value={searchValue ?? ""}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <ButtonSquare onClick={fetchValueSearch} image={Loop} className={style["loop"]} />
      </div>
      <div className={style["two-button"]}>
        <ButtonSquare image={Bell} className={style["button-square"]} />
        <ButtonSquare onClick={handleCalendarOpen} image={Calendar} className={style["button-square"]} />
      </div>
      <Today />
      {open && (
        <div className={style["calendar-overlay"]}>
          <DatePeriod />
          <button onClick={handleCalendarClose} className={style["close-button"]}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Menu;
