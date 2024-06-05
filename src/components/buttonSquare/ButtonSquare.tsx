import styles from "./ButtonSquare.module.css";
import { ButtonProps } from "./ButtonSquare.props";
import cn from "classnames";

function ButtonSquare({image, className, ...props }: ButtonProps) {
	return (
		<button className={cn(styles['button'],styles['accent'], className )} {...props}
		>
			<img src={image}/>
			
		</button>
	);
}
export default ButtonSquare;
