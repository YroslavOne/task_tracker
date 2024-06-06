import styles from "./MenuLink.module.css";
import { MenuLink } from "./MenuLink.props.ts";
import cn from "classnames";
import dashboard from "../../../public/image/menu/sidebar/Dashboard.svg";
import { NavLink } from "react-router-dom";

function ButtonLong({ children, image, link, className, ...props }: MenuLink) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive
          ? cn(styles["button"], styles["active"], styles[`${image}-on`], className)
          : cn(styles["button"], styles[image], className)
      }
      // className={cn(styles["button"], )}

      {...props}
    >
      {children}
      
    </NavLink>
  );
}
export default ButtonLong;
