import styles from './CardForNotification.module.css'
import { CardForNotificationProps } from './CardForNotification.props';



function CardForNotification({ title, priority, colorPriority, image, id }: CardForNotificationProps) {
  return (
    <li className={styles['container']} key={id}>
      <div className={styles['description']}>
        <p className={styles['title']}>Complete the {title}</p>
        <p  className={styles['priority']}>
          Priority: <span style={{ color: colorPriority }}>{priority} </span>
        </p>
      </div>
      <img className={styles['image']} src={image} />
    </li>
  );
}
export default CardForNotification;
