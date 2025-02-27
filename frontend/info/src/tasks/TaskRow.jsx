import axios from "axios";
import { get_user, tasks_api_url } from "../give_objects";
import { get_sessionid } from "../get_cookies";
import Task from "./Task";

import del from "./img/Delete.png";
import DeleteDialog from "./DeleteDialog";

function selectTask(func, user, data, responsible) {
    func(<Task user={user} data={data} responsible={responsible}/>);
}

function deleteTask(id) {
    axios.delete(`${tasks_api_url}/${id}/`, {
        headers: {
            "sessionid": get_sessionid()
        }
    }).then(() => window.location.reload());
}

export default function TaskRow(props) {

    let responsible = get_user(props.data.responsible);

    return (
        <div onClick={() => selectTask(props.setTask, props.user, props.data, responsible)} className="task-row">
            <DeleteDialog id={props.data.id} onDelete={(e) => {e.stopPropagation(); deleteTask(props.data.id)}}/>
            <label className="task-row-text task-row-title">
                {props.data.title}
            </label>
            <label className="task-row-text">
                {responsible.email}
            </label>
            &nbsp;
            <div title="Delete"
                className="task-config-btn">
                <img onClick={(e) => {e.stopPropagation(); 
                document.getElementById(`task-delete-dialog-${props.data.id}`).showModal()}}  
                width={17} height={17} src={del}/>
            </div>
        </div>
    );
}