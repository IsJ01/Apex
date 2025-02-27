import { useState, useEffect } from "react";

import axios from "axios";

import "./css/tasks.css";

import NewTaksDialog from "./NewTaksDialog";
import UserTasks from "./UserTasks";
import ToUserTasks from "./ToUserTasks";
import { get_sessionid } from "../get_cookies";
import TaskFilterDialog from "./TaskFilterDialog";

function show_dialog() {
    document.getElementById("new-task-dialog").showModal();
}

export default function TasksPage(props) {

    const [content, setContent] = useState("your");    
    const [user, setUser] = useState({});
    const [filter, setFilter] = useState({});
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
            <NewTaksDialog user={user}/>
            <TaskFilterDialog/>
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
                    <div onClick={() => {}} className="menu-title">
                        Filter
                    </div>
                </div>
                <div className="tasks-content">
                    {
                        content === "your"
                        ?
                        <UserTasks user={user}/>
                        :
                        <ToUserTasks user={user}/>
                    }
                </div>
            </div>
        </>
    );
}