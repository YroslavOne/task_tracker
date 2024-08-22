import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonSquare from "../buttonSquare/ButtonSquare";
import style from "./Menu.module.css";
import Loop from "../../../public/image/menu/top/Search.svg";
import Calendar from "../../../public/image/menu/top/calendar.svg";
import Bell from "../../../public/image/menu/top/bell.svg";
import Today from "./component/Today";
import { taskActions } from "../../store/tasks.slice";
import DatePeriod from "../datePeriod/DatePeriod";
import { AppDispatch, RootState } from "../../store/store";
import { getNotifications } from "../../store/notifications.slice";
import { toggleWindowNotification } from "../../store/toggle.slice";

function Menu() {
  const dispatch = useDispatch<AppDispatch>();

  const { filterDate, filterTitle } = useSelector(
    (state: RootState) => state.tasks
  );
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const [searchValue, setSearchValue] = useState<string | null | undefined>(
    filterTitle
  );
  const [searchDate, setsearchDate] = useState<
    [string | null, string | null] | null
  >(filterDate ? filterDate : null);
  const [open, setOpen] = useState<boolean>(false);

  const fetchValueSearch = () => {
    dispatch(taskActions.filterSearch({ search: searchValue }));
  };

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);
  const fetchDateSearch = () => {
    dispatch(taskActions.filterDate({ date: searchDate }));
    setOpen(false);
  };

  const resetDataSearch = () => {
    dispatch(taskActions.filterDate({ date: [null, null] }));
    setOpen(false);
  };

  const handleCalendarOpen = () => {
    setOpen(true);
  };
  const handleNotificationOpen = () => {
    dispatch(toggleWindowNotification());
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
          value={null}
          onClick={fetchValueSearch}
          image={Loop}
          className={style["loop"]}
        />
      </div>
      <div className={style["two-button"]}>
        <ButtonSquare
          value={null}
          onClick={handleCalendarOpen}
          image={Calendar}
          className={style["button-square"]}
        />
        <ButtonSquare
          onClick={handleNotificationOpen}
          value={notifications?.length === 0 ? null : notifications?.length}
          image={Bell}
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
            <button onClick={resetDataSearch} className={style["close-button"]}>
              Reset
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
