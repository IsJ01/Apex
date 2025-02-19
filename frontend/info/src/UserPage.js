import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { get_sessionid } from "./get_cookies";
import './css/user_page.css';
import user_img from './img/User.png';
import CancelButton from "./reusable/CancelButton";
import Report from "./reusable/Report";
import {get_black_list, get_chats, get_report_categories, get_report_category, get_reports, get_tasks, get_user, get_user_from_email, get_users} from './give_objects';
import DropMenu from "./reusable/DropMenu";
import { tasks_api_url } from "./give_objects";
import Task from "./reusable/Task";
import SearchBar from "./chat/SearchBar";
import AddChatDialog from "./chat/AddChatDialog";
import Chats from "./chat/Chats";


export default function UserPage(props) {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [pageUser, setPageUser] = useState({});
    const [mode, setMode] = useState('');
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [inBlackList, setInBlackList] = useState(false);
    const [userFilter, setUserFilter] = useState("");
    const users_api_url = 'http://localhost:8001';
    const reports_api_url = "http://127.0.0.1:8002";
    const report_categories_api_url = "http://127.0.0.1:8006";
    useEffect(() => {
        updateUser();
        get_page_user();
    }, []);

    function updateUser() {
        let sessionid = get_sessionid();
        axios.get(`${users_api_url}/current/`, 
            {headers: {'sessionid': sessionid}}).then(res => {
            if (res.data.is_authenticated) {
                setUser(res.data);
            }
            let black_list = get_black_list();
            let u = black_list.filter(u => u["user"] == res.data.id);
            if (u.length == 1) {
                setInBlackList(true);
            }
        });
    }

    function get_page_user() {
        axios.get(`${users_api_url}/${id}/`).then(res => {
            setPageUser(res.data);
        });
    }

    // функция обновления данных пользователя
    function apply() { 
        let data = {
            username: document.getElementById('name-input').value,
            about: document.getElementById('about-input').value,
            year_of_birth: document.getElementById('year-input').value,
        }
        let image = document.getElementById('image-input').files[0];
        if (image) {
            data = {...data, image: image};
        }
        let number = document.getElementById('number-input').value;
        if (number) {
            data = {...data, number: number};
        }
        if (!number) {
            data = {...data, number: ""};
        }
        axios.patch(`${users_api_url}/${pageUser.id}/`, data, 
            {headers: {'content-type': 'multipart/form-data',
                'sessionid': get_sessionid()
            }});
        let new_password = document.getElementById('password-input').value;
        let repeat_new_password = document.getElementById('repeat-password-input').value;
        if (new_password != false && new_password == repeat_new_password) {
            axios.put(`${users_api_url}/${pageUser.id}/password/`, 
                {password: new_password}, 
                {
                    headers: {sessionid: get_sessionid()}
                });
        }
        window.location.reload(true);
    }

    function show_dialog(id) {
        return function() {
            document.getElementById(id).showModal();
        };
    }
    
    function close_dialog(id) {
        return function() {
            document.getElementById(id).close()
        };
    }

    // функция получения статуса пользователя
    function get_status(user) {
        if (user.is_superuser) {
            return "Admin";
        } 
        else if (user.is_staff) {
            return "Staff";
        }
        else {
            return "User";
        }
    }

    // функция обновления того, что мы хотим отобразить
    function set_new_mode(mode) {
        return function () {
            setMode(mode);
        }
    }

    // функция добавления отчета
    function add_report() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${report_categories_api_url}/`, false);
        xhr.send();
        let categories = JSON.parse(xhr.responseText);
        xhr.open("GET", `${users_api_url}/`, false);
        xhr.send();
        let users = JSON.parse(xhr.responseText);
        let to = document.getElementById('report-dialog-to').value;
        let category = document.getElementById('report-dialog-category').value;
        let title = document.getElementById('report-dialog-title').value;
        let details = document.getElementById('report-dialog-details').value;
        let to_user = users.filter(user => user.email == to)[0];
        let cat = categories.filter(cat => cat.name == category)[0];
        axios.post(`${reports_api_url}/`, {title: title, to: to_user.id, of: user.id, 
            category: cat.id, description: details},
            {headers: {sessionid: get_sessionid()}})
        window.location.reload(true);
    }

    function add_task() {
        let to = document.getElementById('task-dialog-to').value;
        let description = document.getElementById('task-dialog-desc').value;
        let to_user = get_user_from_email(to);
        axios.post(`${tasks_api_url}/`, {near: to_user.id, of: user.id, description: description, status: "IN_PROGRESS"},
            {headers: {sessionid: get_sessionid()}}
        )
        window.location.reload(true);
    }

    function select(props) {
        return function(e) {
            let value = e.target.value;
            if (['IN_PROGRESS', 'COMPLETE', 'UNCOMPLETE'].includes(value)) {
                axios.put(`${tasks_api_url}/${props.id}`, {
                    "near": props.near, 
                    "of": props.of,
                    "description": props.description,
                    "status": value.trim()},
                    {headers: {sessionid: get_sessionid()}}
                )
                .catch(e => console.log(e));
                window.location.reload(true);
            }
        }
    }

    // функция отображения центральной панели
    function get_central_panel(mode) {

        function delete_image() {
            axios.patch(`${users_api_url}/${pageUser.id}/`, {image: ""}, 
                {headers: {'content-type': 'multipart/form-data',
                    'sessionid': get_sessionid()
                }});
            window.location.reload(true);
        }

        let panel;
        if (mode == 'settings') {
            panel = (
                <div className="settings-panel" style={{marginTop: '20px', marginLeft: '20px'}}>
                    <p>
                        <label>Name:</label>
                        <input className="settings-panel-input" id='name-input' defaultValue={pageUser.username}/>
                    </p>
                    <p>
                        <label>Number:</label>
                        <input className="settings-panel-input" id='number-input' defaultValue={pageUser.number}/>
                    </p>
                    <p>
                        <label>About:</label>
                        <textarea className="settings-panel-input" id='about-input' 
                            style={{height: '30px', width: '189px', maxHeight: '200px'}}>
                            {pageUser.about}
                        </textarea>
                    </p>
                    <p>
                        <label>Year of birth</label>
                        <input className="settings-panel-input" id='year-input' defaultValue={pageUser.year_of_birth}/>
                    </p>
                    <p>
                        <label>New Password</label>
                        <input className="settings-panel-input" id='password-input'/>
                    </p>
                    <p>
                        <label>Repeat New Password</label>
                        <input className="settings-panel-input" id="repeat-password-input"/>
                    </p> 
                    <p>
                        <label>profile photo</label>
                        <input style={{visibility: 'hidden', position: 'absolute'}} id="image-input" 
                        type="file" accept="images/*"/> 
                        <label htmlFor="image-input" style={{width: '90px'}}>
                            <span title="Choose image" className="styleBtn styleBtn-outline-red-2">Choose</span>
                        </label>
                        <input title="Delete image" type="button" onClick={delete_image} 
                        className="styleBtn styleBtn-outline-danger" value="Delete"/>
                    </p>
                    <button onClick={apply} className="styleBtn styleBtn-outline-red-2">Apply</button>
                </div>
            );
        }
        else if (mode == 'reports') {
            let users = get_users();
            let categories = get_report_categories();
            let reports = get_reports();
            panel = (
                <div style={{marginTop: '20px', marginLeft: '20px'}}>
                    <div>
                        <dialog id="report-dialog">
                            <CancelButton func={close_dialog('report-dialog')}/>
                            <fieldset>
                                <p>
                                    <label>title:</label>
                                    <input id="report-dialog-title"/>
                                </p>
                                <p>
                                    <label>To:</label>
                                    <select id="report-dialog-to">
                                        {users.map(u => (!u.is_superuser && u.id != user.id) && <option>{u.email}</option>)}
                                    </select>
                                </p>
                                <p>
                                    <label>Category:</label>
                                    <select id="report-dialog-category">
                                        {categories.map(cat => <option>{cat.name}</option>)}
                                    </select>
                                </p>
                                <p>
                                    <label>Details:</label>
                                    <input id="report-dialog-details"/>
                                </p>
                                <p style={{textAlign: 'end'}}><button onClick={add_report} className="styleBtn styleBtn-outline-ok">Apply</button></p>
                            </fieldset>
                        </dialog>
                        <p>{((user.is_staff || user.is_superuser) && user.id != pageUser.id) ? "From user:" : "From me:"}</p>
                        {reports.map(report => (report.of == pageUser.id) && 
                        <Report title={report.title} to={get_user(report.to).email}
                        category={get_report_category(report.category).name} details={report.description} status={report.status}/>)}
                        {(pageUser.id == user.id && !inBlackList) && 
                        <button className="styleBtn styleBtn-outline-new" onClick={show_dialog('report-dialog')}>Add</button>}
                    </div>
                </div>
            );
        }
        else if (mode == 'tasks-to') {
            let tasks = get_tasks().content.filter(t => t["near"] == user.id).map(t => <Task {...t}/>);
            panel = (
                <div>
                    <div style={{margin: '10px'}}>
                        <div style={{overflow: "auto", width: "300px"}}>
                            {tasks}
                        </div>
                    </div>
                </div>
            );
        }
        else if (mode == 'tasks-of') {
            let users = get_users();
            let tasks = get_tasks().content.filter(t => t["of"] == user.id).map(t => <Task {...t} select={select(t)}/>);
            panel = (
                <div>
                    <div style={{margin: '10px'}}>
                        <dialog style={{border: '1px solid black', borderRadius: '9px'}} id="task-dialog">
                            <CancelButton func={close_dialog('task-dialog')}/>
                            <fieldset>
                                <p>
                                    <label>To:</label>
                                    <select id="task-dialog-to">
                                        {users.map(u => (!u.is_superuser && u.id != user.id) && <option>{u.email}</option>)}
                                    </select>
                                </p>
                                <p>
                                    <label>Description:</label>
                                    <input id="task-dialog-desc"/>
                                </p>
                                <p style={{textAlign: 'end'}}>
                                    <button onClick={add_task} className="styleBtn styleBtn-outline-ok">
                                        Apply
                                    </button>
                                </p>
                            </fieldset>
                        </dialog>
                        <div style={{overflow: "auto", width: "300px"}}>
                            {tasks}
                        </div>
                        {!inBlackList && <button onClick={show_dialog('task-dialog')} 
                            className="styleBtn styleBtn-outline-new">Add</button>}
                    </div>
                </div>
            );
        }
        else if (mode == 'messages') {
            let chats = get_chats().filter(chat => chat.user1 == user.id || chat.user2 == user.id)
                .map(chat => {
                    if (chat.user1 == user.id) {
                        return {id: chat.id, user1: user, user2: get_user(chat.user2), messages: chat.messages};
                    } 
                    if (chat.user2 == user.id) {
                        return {id: chat.id, user1: get_user(chat.user1), user2: user, messages: chat.messages};
                    }
                })
                .filter(chat => (chat.user1.id == user.id && chat.user2.username.includes(userFilter)) ||
                    (chat.user2.id == user.id && chat.user1.username.includes(userFilter)));
            panel = (
                <div>
                    {
                        user.id == pageUser.id
                        &&
                            <div>
                                <AddChatDialog user={user} users={get_users().filter(u => u.id != user.id)}/>
                                <SearchBar onSearch={(e) => setUserFilter(e.target.value)}/>
                                <Chats user={user} chats={chats}/>
                            </div>
                        }
                </div>
            );
            if (inBlackList) {
                panel = (
                    <div>
                        <h1>User in black list</h1>
                    </div>
                );
            }
        }
        return panel;
    }

    // функция открытия меню
    function open_menu() {
        let el = document.getElementById('user-menu-button');
        if (isOpenMenu) {
            el.innerText = '⮞';
            document.getElementById('user-menu').style.display = 'none';
            setIsOpenMenu(false);
        } else {
            el.innerText = '⮟';
            document.getElementById('user-menu').style.display = 'block';
            setIsOpenMenu(true);
        }
    }

    function get_drop_menu_struct() {
        let struct = [];
        let user_tasks = (user.is_staff || user.is_superuser) 
        && 
        {title: "My Tasks (in development)", onClick: set_new_mode('tasks-of'), innerText: "My Tasks"};
        let to_user_tasks = (!user.is_superuser) 
        && 
        {title: "Tasks to me (in development)", onClick: set_new_mode('tasks-to'), innerText: "Tasks to me"};
        if ((user.is_staff && !pageUser.is_superuser) || user.id == pageUser.id) {
            struct.push({title: "Settings", onClick: set_new_mode('settings'), innerText: "Settings"});
            struct.push({title: "Reports", onClick: set_new_mode('reports'), innerText: "Reports"});
            user_tasks && struct.push(user_tasks);
            to_user_tasks && struct.push(to_user_tasks);
        }
        if (user.id == pageUser.id) {
            struct.push({onClick: set_new_mode('messages'), 
            title: "Messages", innerText: "Messages"});
        }
        return struct;
    }

    return (
        <div className="user-page">
            <dialog id="description-dialog" className="description-dialog">
                <CancelButton func={close_dialog('description-dialog')}/>
                <label>
                    <b>Description</b>
                    <br/>
                    {pageUser.about}
                </label>
            </dialog>
            <div className="user-info">
                {
                    (pageUser.id == user.id || (user.is_staff && !pageUser.is_superuser))
                    &&
                    <p style={{marginBottom: '0px', paddingLeft: '10px'}}>
                        <button id="user-menu-button" className="styleBtn-outline-normal configure-btn" 
                            title="Settings" onClick={open_menu}>⮞</button>
                        <DropMenu id="user-menu" className="" 
                            struct={get_drop_menu_struct()}/>
                    </p>
                }
                <label className="user-image-label">
                    <img className="user-image" width={100} height={100} src={pageUser.image ? pageUser.image : user_img}/>
                </label>
                <label className="user-info-name">Name: {pageUser.username}</label>
                <label className="user-info-name">Number: {pageUser.number}</label>
                <label className="user-info-name">Age: {new Date().getFullYear() - pageUser.year_of_birth}</label>
                <label className="user-info-name">Status: {get_status(pageUser)}</label>
                <p style={{width: '100%', marginTop: '20px', marginBottom: '0px', textAlign: 'center'}}>
                    <button className="description-btn" onClick={show_dialog('description-dialog')}>Description...</button>
                </p>
            </div>
            <div className="user-central-panel" style={{outline: 'auto'}}>
                {get_central_panel(mode)}
            </div>
        </div>
    );
}