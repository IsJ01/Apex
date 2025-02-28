import { useState } from "react";
import { get_filter_tasks } from "../give_objects";
import TaskRow from "./TaskRow.jsx";

export default function UserTasks(props) {

    const [task, setTask] = useState();
    
    let filter = structuredClone(props.filter);
    
    filter.of = props.user.email ? props.user.email : -1;
    let tasks = get_filter_tasks(filter).content.map(t => <TaskRow user={props.user} setTask={setTask} data={t}/>);

    return (
        <div className="tasks-container">
            <div className="user-tasks">
                <div className="tasks-list">
                    {tasks}
                </div>
                <div id="task-content" className="task-content">
                    {task}
                </div>
            </div>
        </div>
       
    );
}