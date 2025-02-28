import { useEffect } from "react";
import { get_users, get_statuses } from "../give_objects";

export default function TaskFilterDialog(props) {

    useEffect(() => {
        document.getElementById("filter-title").value = props.filter.title;
        if (props.type === "your") {
            document.getElementById("filter-responsible").value = props.filter.responsible;
        } else {
            document.getElementById("filter-of").value = props.filter.of;
        }
        document.getElementById("filter-firstDate").value = props.filter.firstDate;
        document.getElementById("filter-lastDate").value = props.filter.lastDate;
        document.getElementById("filter-status").value = props.filter.status;
        document.getElementById("filter-repetitive").checked = props.filter.repetitive;
    }, []);

    let users = get_users();
    if (props.type === "your") {
        users = users.filter(usr => usr.is_superuser !== true);
    }
    users = users.map(usr => usr.email);
    if (!users.includes("")) {
        users.push("");
    }
    users = users.map(usr => (
        <option>{usr}</option>
    ));

    function close_dialog() {
        document.getElementById("task-filter-dialog").close();
    }

    function setFilter() {
        let title = document.getElementById("filter-title").value;
        let firstDate = document.getElementById("filter-firstDate").value;
        let lastDate = document.getElementById("filter-lastDate").value;
        let status = document.getElementById("filter-status").value;
        let repetitive = document.getElementById("filter-repetitive").checked;
        let filter = {
            title: title,
            firstDate: firstDate,
            lastDate: lastDate,
            status: status,
            repetitive: repetitive
        };

        if (props.type === "your") {
            let responsible = document.getElementById("filter-responsible").value;
            filter.responsible = responsible;
        } else {
            let of = document.getElementById("filter-of").value;
            filter.of = of;
        }
        props.setFilter(filter);
    }

    return (
        <dialog id="task-filter-dialog" className="task-filter-dialog">
            <div className="task-filter-dialog-row">
                <label>Title</label>
                <input id="filter-title" className="task-filter-dialog-input"/>
            </div>
            <div className="task-filter-dialog-row">
                {props.type === "your"
                ?
                <>
                    <label>Responsible</label>
                    <select title="Responsible" id="filter-responsible" className="task-filter-dialog-input task-select">
                        {users}
                    </select>
                </>
                :
                <>
                    <label>Of</label>
                    <select title="of" id="filter-of" className="task-filter-dialog-input task-select">
                        {users}
                    </select>
                </>
                }
            </div>
            <div className="task-filter-dialog-row">
                <label>Period</label>
                <input id="filter-firstDate" type="date" className="task-filter-dialog-input task-filter-dialog-date"/>
                -
                <input id="filter-lastDate" type="date" className="task-filter-dialog-input task-filter-dialog-date"/>
            </div>
            <div className="task-filter-dialog-row">
                <label>Status</label>
                <select id="filter-status" className="task-select task-filter-dialog-input">
                    {get_statuses().map(s => <option>{s}</option>)}
                </select>
            </div>
            <div className="task-filter-dialog-row" style={{display: "flex"}}>
                <label>
                    Repetitive
                </label>
                <input id="filter-repetitive" className="task-dialog-btn task-checkbox" type="checkbox"/>
            </div>
            <div className="task-dialog-row" style={{display: "flex", justifyContent: "end"}}>
                <button onClick={() => setFilter()} className="task-dialog-btn styleBtn styleBtn-outline-red">Send</button>
                <button onClick={close_dialog} className="task-dialog-btn styleBtn styleBtn-outline-red">Cancel</button>
            </div>
        </dialog>
    );
}