import styles from "./ButtonSquare.module.css";
import { ButtonSquareProps } from "./ButtonSquare.props";
import cn from "classnames";

function ButtonSquare({ image, value, className, ...props }: ButtonSquareProps) {
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
