import styles from "./ButtonSquare.module.css";
import { ButtonProps } from "./ButtonSquare.props";
import cn from "classnames";

function ButtonSquare({ image, value, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(styles["button"], styles["accent"], className)}
      {...props}
    >
      <img src={image} />
      {value && <span className={styles["span"]}>{value}</span>}
    </button>
  );
}
export default ButtonSquare;
