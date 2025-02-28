import { useEffect } from "react";
import { get_statuses, tasks_api_url } from "../give_objects";

import { get_sessionid } from "../get_cookies";

import axios from "axios";
import { show_change } from "./show_info";

import arrow from "./img/Arrow.png";
import eye from "./img/Eye.png";
import notEye from "./img/NotEye.png";

export default function Task(props) {

    let description = props.data.description;

    useEffect(() => {
        if (props.data.checked === false && props.data.responsible === props.user.id) {
            let data = new FormData();
            data.append("checked", true);
            axios.patch(`${tasks_api_url}/check/${props.data.id}/`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "sessionid": get_sessionid()
                }
            }).then(() => {
                let row = document.getElementById(`task-delete-dialog-${props.data.id}`).parentElement;
                row.className = "task-row";
            });
        }
        if (props.user.id === props.data.of) {
            document.getElementById("task-select").value = props.data.status;
            document.getElementById("task-repetitive-sel").value = get_repetitive(props.data.repetitive);
        }

        if (!document.getElementById("task-period")) {
            let span = document.createElement('span');
            span.id = "task-period";
            span.innerText = `${props.data.firstDate} / ${props.data.lastDate ? props.data.lastDate : '-'}`;
            if (props.user.id === props.data.of) {
                document.getElementById("task-date-field").insertBefore(
                    span,
                    document.getElementById("new-task-lastDate")
                );
            } else {
                document.getElementById("task-date-field").appendChild(span);
            }
        } else {
            let span = document.getElementById('task-period');
            span.innerText = `${props.data.firstDate} / ${props.data.lastDate ? props.data.lastDate : '-'}`;
        }

    });

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i !== s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }

    function download_file(file) {
        let f = new Blob([s2ab(atob(file.stringBytes))], {type: ""});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(f);
        link.download = file.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(file.fileName);
    }

    function set_new_file() {
        let inp = document.getElementById("new-file-inp");
        inp.click();
    }

    function send_file() {
        let inp = document.getElementById("new-file-inp");
        let file = inp.files[0];
        if (file) {
            let data = new FormData();
            data.append("file", file);
            axios.patch(`${tasks_api_url}/${props.data.id}/`, data, 
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "sessionid": get_sessionid()
                }
            })
            .then(() => window.location.reload());
        }
    }

    function update_status(e, id) {
        let data = new FormData();
        data.append("status", e.target.value);
        axios.patch(`${tasks_api_url}/${id}/`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "sessionid": get_sessionid()
            }
        }).then(() => {
            show_change("Status update");
        });
    }

    function set_last_date() {
        let inp = document.getElementById("new-task-lastDate");
        inp.showPicker();
    }

    function update_lastDate(e, id) {
        let data = new FormData();
        data.append("lastDate", e.target.value);
        axios.patch(`${tasks_api_url}/${id}/`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "sessionid": get_sessionid()
            }
        })
        .then((res) => {
            let last_date = res.data.lastDate ? res.data.lastDate : "-";
            document.getElementById("task-period").innerText = `${props.data.firstDate} / ${last_date}`;;
            show_change("Last date update");
        });
    }

    function update_props_repetitive(e, id) {
        let data = new FormData();
        data.append("repetitive", get_repetitive_reverse(e.target.value));
        axios.patch(`${tasks_api_url}/${id}/`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "sessionid": get_sessionid()
            }
        }).then(() => {
            show_change("Is repetitive update");
        });
    }

    function get_repetitive(st) {
        return st ? "✓" : "×";
    }

    function get_repetitive_reverse(st) {
        return st === "✓" ? true : false;
    }

    return (
        <div id="task-data" className="task">
            <div className="task-title">{props.data.title}</div>
            <div className="title-description">
                {description}
            </div>
            <div className="task-field">
                <span style={{color: "rgb(216, 64, 64)"}}>Responsible:</span>
                &nbsp;
                <img style={{borderRadius: '25px'}} width="25" height="25" alt={"img"}
                src={props.responsible.image ? props.responsible.image : "/static/media/User.c111d80991fc4792183f.png"}/>
                &nbsp;
                <a href={`/users/${props.responsible.id}`} className="task-link">{props.responsible.email}</a>&nbsp;
                {
                    props.user.id === props.data.of
                    &&
                    (
                        props.data.checked
                        ?
                        <img title="checked" width={20} height={20} src={eye} alt="checked"/>
                        :
                        <img title="not checked" width={20} height={20} src={notEye} alt="not checked"/>
                    )
                }
            </div>
            <div className="task-field" id="task-date-field">
                <span style={{color: "rgb(216, 64, 64)"}}>Period:</span>&nbsp;
                {
                    props.user.id === props.data.of
                    &&
                    <>
                        <input onChange={(e) => update_lastDate(e, props.data.id)} id="new-task-lastDate" 
                        style={{width: "0px", height: "0px", background: "none", border: "none"}} type="date"/>
                        <button onClick={set_last_date} className="task-config-btn">⚙</button>
                    </>
                }
            </div>
            <div className="task-field">
                <span style={{color: "rgb(216, 64, 64)"}}>Status:</span>&nbsp;
                {props.user.id === props.data.of
                ?
                    <select id="task-select" onChange={(e) => update_status(e, props.data.id)} className="task-select">
                        {get_statuses().map(s => <option>{s}</option>)}
                    </select>
                :
                    props.data.status
                }
            </div>
            <div className="task-field">
                <span style={{color: "rgb(216, 64, 64)"}}>File:</span>&nbsp;
                {props.data.file
                ?
                <>
                    <span onClick={() => download_file(props.data.file)} className="task-file">{props.data.file.fileName}</span>
                    {props.user.id === props.data.of &&
                        <label>
                            <input onChange={send_file} style={{display: "none"}} id="new-file-inp" type="file"/>
                            <label title="Set" onClick={set_new_file} className="set-file-btn">
                                <img width={25} height={20} src={arrow}/>
                            </label>
                        </label>
                    }
                </>
                :
                <>
                    {props.user.id === props.data.of &&
                        <label>
                        <input onChange={send_file} style={{display: "none"}} id="new-file-inp" type="file"/>
                        <label title="Set" onClick={set_new_file} className="set-file-btn">
                            <img width={25} height={20} src={arrow}/>
                        </label>
                    </label>
                    }
                </>
                }
            </div>
            <div className="task-field">
                <span style={{color: "rgb(216, 64, 64)"}}>Repetitive:</span>&nbsp;
                {props.user.id === props.data.of
                ?
                    <select id="task-repetitive-sel" onChange={(e) => update_props_repetitive(e, props.data.id)} 
                    className="task-select">
                        <option>✓</option>
                        <option>×</option>
                    </select>
                :
                    get_repetitive(props.data.repetitive)
                }
            </div>
        </div>
        
    );
}