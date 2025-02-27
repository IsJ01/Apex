import axios from "axios";
import { get_user_from_email, get_users, tasks_api_url } from "../give_objects";

import {get_sessionid} from "../get_cookies";

function close_dialog() {
    document.getElementById("new-task-dialog").close();
}

function sendTaks(user) {
    let data = new FormData();

    let of = user.id;
    let email = document.getElementById("task-responsible").value;
    let responsible = get_user_from_email(email).id;
    let title = document.getElementById("task-title").value;
    let description = document.getElementById("task-description").value;
    let last_date = document.getElementById("task-last-date").value;
    let repetitive = document.getElementById("task-repetitive").checked;
    let file = document.getElementById("task-file-inp").files[0];

    data.append("of", of);
    data.append("responsible", responsible);
    data.append("title", title);
    data.append("description", description);
    data.append("repetitive", repetitive);
    if (last_date) {
        data.append("lastDate", last_date);
    }
    if (file) {
        data.append("file", file);
    }

    axios.post(`${tasks_api_url}/`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            "sessionid": get_sessionid()
        }
    })
    .then(() => window.location.reload());
}

export default function NewTaksDialog(props) {

    let users = get_users().filter(usr => usr.is_superuser !== true).map(usr => (
        <option>{usr.email}</option>
    ));

    return (
        <dialog className="new-task-dialog" id="new-task-dialog">
            <div className="task-dialog-row">
                <label>Title:</label>
                <br/>
                <input id="task-title" placeholder="Title"/>
            </div>
            <div className="task-dialog-row">
                <textarea id="task-description" className="task-description" placeholder="Description"/>
            </div>
            <div className="task-dialog-row" style={{display: "flex", justifyContent: "start"}}>
                <div>
                    <label htmlFor="task-file-inp">
                        <input style={{display: "none"}} id="task-file-inp" type="file"/>
                        <span className="task-dialog-btn">File</span>
                    </label>
                </div>
                <select title="Responsible" id="task-responsible" className="task-dialog-btn">
                    {users}
                </select>
                <input style={{width: "100px"}} type="date" id="task-last-date" className="task-dialog-btn"/>
                <label style={{width: "80px"}} htmlFor="task-repetitive">
                    <span className="task-dialog-btn">Repetitive</span>
                </label>
                <input className="task-dialog-btn task-checkbox" type="checkbox" id="task-repetitive"/>
            </div>
            <div className="task-dialog-row" style={{display: "flex", justifyContent: "end"}}>
                <button onClick={() => sendTaks(props.user)} className="task-dialog-btn styleBtn styleBtn-outline-red-2">Send</button>
                <button onClick={close_dialog} className="task-dialog-btn styleBtn styleBtn-outline-red-2">Cancel</button>
            </div>
        </dialog>
    );
}