import style from './Dashboard.module.css'
import Pending from './../../../public/image/dashboard/Pending.svg'
import Plus from './../../../public/image/dashboard/taSK.svg'
import Task from '../../components/task/Task'


function Dashboard(){
    const d = new Date()
    const day = d.getDate()
    const mount = d.toLocaleDateString("en-US", { month: 'long' })
return(
    <div className={style["container"]}>
        <div className={style["list-task"]}>
        <div className={style["top-bar"]}>
            <div className={style["title"]}>
                <img  src={Pending} alt="" />
                <p className={style["todo"]}>To-Do</p>
            </div>
            <div className={style["button"]}>
                <img className={style["image"]} src={Plus} alt="" />
               <p> Add task</p>
            </div>


        </div>
        <div>
            <p className={style["today"]}>{day} {mount} <span> &bull; Today</span></p>
        </div>
        <div className={style["task"]}> <Task/> <Task/> <Task/> <Task/> <Task/></div>
        </div>
    </div>
)
}
export default Dashboard