import styles from "./MenuLink.module.css";
import { MenuLink } from "./MenuLink.props";
import cn from "classnames";
import { NavLink } from "react-router-dom";

function ButtonLong({ children, image, link, className, onClick, ...props }: MenuLink) {
  return (
    <NavLink
    onClick={onClick}
      to={link}
      className={({ isActive }) =>
        isActive
          ? cn(
              styles["button"],
              styles["active"],
              styles[`${image}-on`],
              className
            )
          : cn(styles["button"], styles[image], className)
      }
      {...props}
    >
      {children}
    </NavLink>
  );
}
export default ButtonLong;
