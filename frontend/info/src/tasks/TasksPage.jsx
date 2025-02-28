import { useState, useEffect } from "react";

import axios from "axios";

import "./css/tasks.css";

import NewTaksDialog from "./NewTaksDialog";
import UserTasks from "./UserTasks";
import ToUserTasks from "./ToUserTasks";
import { get_sessionid } from "../get_cookies";
import TaskFilterDialog from "./TaskFilterDialog";

import del from "./img/Delete.png";

function show_dialog() {
    document.getElementById("new-task-dialog").showModal();
}

export default function TasksPage(props) {

    let filter_def = {
        of: "",
        title: "",
        responsible: "",
        firstDate: "",
        lastDate: "",
        status: "",
        repetitive: ""
    };

    const [content, setContent] = useState("your");    
    const [user, setUser] = useState({});
    const [filter, setFilter] = useState(filter_def);
    const api_url = "http://127.0.0.1:8001";

    useEffect(() => {
        updateUser();
    }, []);
    
    function updateUser() {
        let sessionid = get_sessionid();
        axios.get(`${api_url}/current/`, 
            {headers: {'sessionid': sessionid}}).then(res => {
            if (res.data.is_authenticated) {
                setUser(res.data);
            }
        });
    }
    
    document.title = "Tasks";

    return (
        <>
            {user.is_authenticated
            ?
            <>
                <NewTaksDialog user={user}/>
                <TaskFilterDialog type={content} setFilter={setFilter} filter={filter} />
                <div className="tasks-page">
                    <div className="tasks-menu">
                        <div onClick={() => show_dialog()} className="menu-title">
                            New taks +
                        </div>
                        <div onClick={() => setContent("your")} className="menu-title">
                            Your tasks
                        </div>
                        {!user.is_superuser &&
                            <div onClick={() => setContent("to-you")} className="menu-title">
                            Tasks to you
                            </div>
                        }
                        <div style={{display: "flex"}} 
                            onClick={() => {document.getElementById("task-filter-dialog").showModal()}} className="menu-title">
                            Filter&nbsp;
                            <div>
                                <img onClick={(e) => {e.stopPropagation();setFilter(filter_def)}} width={15} height={15} src={del}/>
                            </div>
                        </div>
                    </div>
                    <div className="tasks-content">
                        {
                            content === "your"
                            ?
                            <UserTasks user={user} filter={filter}/>
                            :
                            <ToUserTasks user={user} filter={filter}/>
                        }
                    </div>
                </div>
            </>
            :
            <h1 style={{width: '100%', height: '100%', paddingTop: '20%', paddingLeft: '35%'}}>This page is only available to users</h1>
            }
        </>
    );
}