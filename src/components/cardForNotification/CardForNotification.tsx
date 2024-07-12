import { useDispatch } from "react-redux";
import { deleteNotification } from "../../store/notifications.slice";
import styles from "./CardForNotification.module.css";
import { CardForNotificationProps } from "./CardForNotification.props";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { getTaskById } from "../../store/openTask.slice";

function CardForNotification({
  title,
  priority,
  colorPriority,
  image,
  id,
}: CardForNotificationProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const clickOnCard = () => {
    dispatch(deleteNotification(id));
    navigate("/my-task");
    dispatch(getTaskById({ id: id }))

  };

  return (
    <li
      className={styles["container"]}
      key={id}
      onClick={clickOnCard}
    >
      <div className={styles["description"]}>
        <p className={styles["title"]}>Complete the "{title}" task</p>
        <p className={styles["priority"]}>
          Priority: <span style={{ color: colorPriority }}>{priority} </span>
        </p>
      </div>
      <img className={styles["image"]} src={image} />
    </li>
  );
}
export default CardForNotification;
