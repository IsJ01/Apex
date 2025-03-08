import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { get_sessionid } from "./get_cookies";
import './css/user_page.css';
import user_img from './img/User.png';
import CancelButton from "./reusable/CancelButton";
import {get_black_list, get_chats, get_user, get_users} from './give_objects';
import DropMenu from "./reusable/DropMenu";
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
        document.title = res.data.username;
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
                        type="file" accept="images/*" className="settings-panel-input"/> 
                        <label htmlFor="image-input" style={{width: '90px'}}>
                            <span title="Choose image" className="styleBtn styleBtn-outline-red-2">Choose</span>
                        </label>
                        <input style={{width: "75px"}} title="Delete image" type="button" onClick={delete_image} 
                        className="styleBtn styleBtn-outline-danger" value="Delete"/>
                    </p>
                    <button onClick={apply} className="styleBtn styleBtn-outline-red-2">Apply</button>
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
                <div style={{width: "100%"}}>
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
        if ((user.is_staff && !pageUser.is_superuser) || user.id == pageUser.id) {
            struct.push({title: "Settings", onClick: set_new_mode('settings'), innerText: "Settings"});
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