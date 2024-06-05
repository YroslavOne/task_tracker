import styles from "./ButtonSquare.module.css";
import { ButtonProps } from "./ButtonLong.props";
import cn from "classnames";

function ButtonSquare({children, image, className, ...props }: ButtonProps) {
	return (
		<button className={cn(styles['button'],styles['accent'], className )} {...props}
		>
			<img src={image}/>
			{children}
			
		</button>
	);
}
export default ButtonSquare;
