import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonSquare from "../buttonSquare/ButtonSquare";
import style from "./Menu.module.css";
import Bell from "./../../../public/image/menu/top/bell.svg";
import Loop from "../../../public/image/menu/top/Search.svg";
import Calendar from "../../../public/image/menu/top/calendar.svg";
import Today from "./component/Today";
import { taskActions } from "../../store/tasks.slice";
import DatePeriod from "../datePeriod/DatePeriod";
import { RootState } from "../../store/store";

function Menu() {
  const dispatch = useDispatch();

  const { filterDate, filterTitle } = useSelector(
    (state: RootState) => state.tasks
  );
  const [searchValue, setSearchValue] = useState<string | null | undefined>(
    filterTitle
  );
  const [searchDate, setsearchDate] = useState<[string, string] | null>(
    filterDate ? (filterDate as [string, string]) : null
  );
  const [open, setOpen] = useState<boolean>(false);

  const fetchValueSearch = () => {
    dispatch(taskActions.filterSearch({ search: searchValue }));
  };

  const fetchDateSearch = () => {
    dispatch(taskActions.filterDate({ date: searchDate }));
    setOpen(false);
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
        <ButtonSquare
          onClick={fetchValueSearch}
          image={Loop}
          className={style["loop"]}
        />
      </div>
      <div className={style["two-button"]}>
        {/* <ButtonSquare image={Bell} className={style["button-square"]} /> */}
        <ButtonSquare
          onClick={handleCalendarOpen}
          image={Calendar}
          className={style["button-square"]}
        />
      </div>
      <Today />
      {open && (
        <div className={style["calendar-overlay"]}>
          <DatePeriod searchDate={searchDate} setsearchDate={setsearchDate} />
          <div className={style["button-for-calendar"]}>
            <button onClick={fetchDateSearch} className={style["close-button"]}>
              Ok
            </button>
            <button
              onClick={handleCalendarClose}
              className={style["close-button"]}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
