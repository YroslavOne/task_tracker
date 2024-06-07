import styles from "./SideBar.module.css";
import MenuLink from "../buttonLong/MenuLink";

function SideBar() {
  const listMenu: {
    title: string;
    parameter: string;
    link: string;
  }[] = [
    { title: "Dashboard", parameter: "dashboard", link: "/dashboard" },
    { title: "Vital Task", parameter: "vital-task", link: "/vital-task" },
    { title: "My Task", parameter: "my-task", link: "/my-task" },
    { title: "Task Categories", parameter: "task-categories", link: "/task-categories" },
    { title: "Settings", parameter: "settings", link: "/settings" },
    { title: "Help", parameter: "help", link: "/help" },
  ];
  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <img src="https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg" alt="" />
        <div className={styles["user"]}>
          <p>Sundar Gurung</p>
        </div>
        <p className={styles["email"]}>
        sundargurung360@gmail.com
        </p>
        <div className={styles["button"]}>
          {listMenu.map((el) => (
            <MenuLink link={el.link} image={el.parameter} className={styles["menu-link"]}> {el.title}</MenuLink>
          ))}
        </div>
      </div>
      <div className={styles["logout"]}>
      <MenuLink link={"/logout"} image={"logout"} className={styles["logout-link"]}> logout</MenuLink>

      </div>
    </div>
  );
}
export default SideBar;
