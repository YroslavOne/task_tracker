import styles from "./ButtonStandard.module.css";
import cn from "classnames";
import { ButtonStandardProps } from "./ButtonStandard.props";

function ButtonStandard({ children, className, ...props }: ButtonStandardProps) {
	return (
		<button className={cn(styles['button'],styles['accent'], className )} {...props}
		>
			{children}
			
		</button>
	);
}
export default ButtonStandard;
