import { Outlet } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import SideBar from "../../components/sidebar/Sidebar";
import styles from "./Layout.module.css";
import AddAndEditTask from "../../components/addAndEditTask/AddAndEditTask";
import PrioritiesInput from "../../components/prioritiesInput/PrioritiesInput";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../store/toggle.slice";
import { RootState } from "../../store/store";

function Layout() {
  const dispatch = useDispatch();
  const toggleValue = useSelector((state: RootState) => state.toggle.value);

  // const handleToggle = () => {
  //   dispatch(toggle());
  // };
  
  return (
    <div className={styles["container"]}>
      <div>
        <Menu />
        <SideBar />
      </div>

      <div className={styles["content"]}>
        <Outlet />
      </div>
     {toggleValue && <AddAndEditTask title={"Add New Task"} id={0}/>}
      {/* <PrioritiesInput/> */}
    </div>
  );
}
export default Layout;
