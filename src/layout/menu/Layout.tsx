import { Outlet } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import SideBar from "../../components/sidebar/Sidebar";
import styles from "./Layout.module.css";
import AddAndEditTask from "../../components/addAndEditTask/AddAndEditTask";
import PrioritiesInput from "../../components/prioritiesInput/PrioritiesInput";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../store/toggle.slice";
import { AppDispatch, RootState } from "../../store/store";
import { userActions } from "../../store/user.slice";
import { getNotifications } from "../../store/notifications.slice";
import WindowForNotification from "../../components/windowForNotification/WindowForNotification";

function Layout() {
  const dispatch = useDispatch<AppDispatch>();
  const toggleValue = useSelector((state: RootState) => state.toggle.value);
  

  const jwt = useSelector((s: RootState) => s.user.jwt);
  const token = jwt;
  const ws = new WebSocket(`ws://localhost:9995?token=${token}`);

  ws.onmessage = (event) => {
    const notification = JSON.parse(event.data);
    console.log(notification);
    if (notification.type === "new_task") {
      dispatch(getNotifications());
    }
  };

  ws.onopen = () => {
    console.log("Подключен к WebSocket серверу");
  };

  ws.onclose = () => {
    console.log("Отключен от WebSocket сервера");
    dispatch(userActions.logout());
  };

  return (
    <div className={styles["container"]}>
      <div>
        <Menu />
        <SideBar />
      </div>

      <div className={styles["content"]}>
        <Outlet />
      </div>
      {toggleValue && <AddAndEditTask />}
      {/* <PrioritiesInput/> */}
      <WindowForNotification/>
    </div>
  );
}
export default Layout;
