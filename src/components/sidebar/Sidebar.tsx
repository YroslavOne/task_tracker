import styles from "./SideBar.module.css";
import MenuLink from "../buttonLong/MenuLink";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, userActions } from "../../store/user.slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../store/store";

function SideBar() {
  const listMenu: {
    title: string;
    parameter: string;
    link: string;
  }[] = [
    { title: "Dashboard", parameter: "dashboard", link: "/" },
    { title: "Vital Task", parameter: "vital-task", link: "/vital-task" },
    { title: "My Task", parameter: "my-task", link: "/my-task" },
    { title: "Settings", parameter: "settings", link: "/settings" },
    { title: "Help", parameter: "help", link: "/help" },
  ];

  const dispatch = useDispatch<AppDispatch>();
const profile = useSelector((s:RootState)=>s.user.profile)
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);


  const navigate = useNavigate();
  const logout = () => {
    dispatch(userActions.logout());
    navigate("/auth/login");
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <img
          src={profile?.image}
          alt=""
        />
        <div className={styles["user"]}>
          <p>{profile?.firstName} {profile?.lastName}</p>
        </div>
        <p className={styles["email"]}>{profile?.email}</p>
        <div className={styles["button"]}>
          {listMenu.map((el, index) => (
            <MenuLink
              link={el.link}
              key={index}
              image={el.parameter}
              className={styles["menu-link"]}
            >
              {" "}
              {el.title}
            </MenuLink>
          ))}
        </div>
      </div>
      <div className={styles["logout"]}>
				<div className={styles["button-logout"]}>
        <MenuLink
          onClick={logout}
          link={"/auth/login"}
          image={"logout"}
          className={styles["logout-link"]}
        >
          logout
        </MenuLink>
				</div>
      </div>
    </div>
  );
}
export default SideBar;
