import { useDispatch, useSelector } from "react-redux";
import Back from "../../../public/image/menu/notification/back.svg";
import { AppDispatch, RootState } from "../../store/store";
import CardForNotification from "../cardForNotification/CardForNotification";
import MenuPortal from "../menuPortal/MenuPortal";
import styles from "./WindowForNotification.module.css";
import { toggleWindowNotification } from "../../store/toggle.slice";
import useOutsideClick from '../../hooks/useClickOutside/useClickOutside.tsx'

function WindowForNotification() {
  const notificationList = useSelector(
    (state: RootState) => state.notifications.notifications
  );
	const conditionWindowNotification = useSelector(
    (s: RootState) => s.toggle.windowNotification
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleNotificationrClose = () => {
    dispatch(toggleWindowNotification());
  };
	const ref = useOutsideClick(() => {
		if(conditionWindowNotification){
    handleNotificationrClose();
	}
  });

  return (
    <MenuPortal >
      <div ref={ref} className={styles["container"]}>
        <div className={styles["top-bar"]}>
          <h3>Notifications</h3>
          <button onClick={handleNotificationrClose}>
            <img className={styles["image"]} src={Back} alt="" />
          </button>
        </div>
        <ul className={styles["card-notifications"]}>
          {notificationList && notificationList?.length !== 0 ? (
            notificationList?.map((n) => (
              <CardForNotification
                id={n.task.id}
                idNotification={n.id}
                title={n.task.title}
                priority={n.task.priority.name}
                colorPriority={n.task.priority.color}
                image={n.task.image}
              />
            ))
          ) : (
            <li className={styles["li"]}>No notifications</li>
          )}
        </ul>
      </div>
    </MenuPortal>
  );
}
export default WindowForNotification;
