import { Outlet } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import SideBar from "../../components/sidebar/Sidebar";
import styles from "./Layout.module.css";

function Layout() {

  
  return (
    <div className={styles["container"]}>
      <div>
        <Menu />
        <SideBar />
      </div>

      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
}
export default Layout;
