import { useSelector } from "react-redux";
import Back from "../../../public/image/menu/notification/back.svg";
import { RootState } from "../../store/store";
import CardForNotification from "../cardForNotification/CardForNotification";
import MenuPortal from "../menuPortal/MenuPortal";
import styles from "./WindowForNotification.module.css";

function WindowForNotification() {
  const notificationList = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  console.log(notificationList);

  return (
    <MenuPortal>
      <div className={styles["container"]}>
        <div className={styles["top-bar"]}>
          <h3>Notifications</h3>
          <button>
            <img className={styles["image"]} src={Back} alt="" />
          </button>
        </div>
        <ul className={styles["card-notifications"]}>
          {(notificationList && notificationList?.length!==0) ? (
            notificationList?.map((n, index) => (
              <CardForNotification
                id={index}
                title={n.task.title}
                priority={n.task.priority.name}
                colorPriority={n.task.priority.color}
                image={n.task.image}
              />
            ))
          ) : (
            <li>No notifications</li>
          )}
        </ul>
      </div>
    </MenuPortal>
  );
}
export default WindowForNotification;
