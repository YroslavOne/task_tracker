import styles from "./ButtonStandard.module.css";
import { ButtonStandardProps } from "./ButtonStandard.props";
import cn from "classnames";

function ButtonStandard({ children, className, ...props }: ButtonStandardProps) {
	return (
		<button className={cn(styles['button'],styles['accent'], className )} {...props}
		>
			{children}
			
		</button>
	);
}
export default ButtonStandard;
