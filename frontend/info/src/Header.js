import { useState, useEffect } from 'react';
import axios from 'axios';

import './css/index.css';
import './css/buttons.css';

import { get_sessionid } from './get_cookies.js';
import { get_organization_data } from './give_objects.js';
import { getHeaderText } from "./getText.js";

export default function Header(props) {
    const [user, setUser] = useState({});
    const [title, setTitle] = useState("");
    const api_url = "http://127.0.0.1:8001";

    useEffect(() => {
        updateTitle();
        updateUser();
    }, []);

    function updateTitle() {
        let title = get_organization_data().filter(f => f["name"] == "title");
        if (title[0]) {
            setTitle(title[0]["value"]);
        } else {
            setTitle("");
        }
    }

    function updateUser() {
        let sessionid = get_sessionid();
        axios.get(`${api_url}/current/`, 
            {headers: {'sessionid': sessionid}}).then(res => {
            if (res.data.is_authenticated) {
                setUser(res.data);
            }
        });
    }

    function logout() {
        let sessionid = get_sessionid();
        axios.post(`${api_url}/logout/`, {}, {headers: {'sessionid': sessionid}});
        document.cookie = 'sessiondid="";max-age=1;path=/';
        window.location.reload(true);
    }

    function onSelectLang() {
        let lang = document.getElementById("lang-select").value;
        props.setLang(lang);
    }
    
    let text = getHeaderText(props.lang);

    return (
        <header>
            <div className="title">
                <h2 style={{color: "rgb(216, 64, 64)"}}>UCOR</h2>
                <label style={{color: "rgb(216, 64, 64)"}}>{title}</label>
            </div>
            <div className="menuBar">
                <p className="options">
                    <select id="lang-select" defaultValue={props.lang} 
                        onChange={onSelectLang} style={{marginRight: "5px", height: "26px", 
                        background: 'rgb(29, 22, 22)', color: "rgb(216, 64, 64)", border: "none"}}>
                        <option>Русский (Rus)</option>
                        <option>English (UK)</option>
                    </select>
                    { (user.is_superuser || user.is_staff) && 
                        <>
                            <a className="option styleBtn styleBtn-outline-red" href="/configure/" 
                            title={text.confBtnTitle}>{text.confBtn}</a>
                        </>
                    }
                    <a className="option styleBtn styleBtn-outline-red"
                    href="/" title={text.homeBtnTitle}>{text.homeBtn}</a>
                    <a className="option styleBtn styleBtn-outline-red" href="/pages/" 
                    title={text.pagesTitle}>{text.pages}</a>
                    <a className="option styleBtn styleBtn-outline-red"
                    href="/users/" title={text.usersBtnTitle}>{text.usersBtn}</a>
                    { user.is_authenticated && 
                        <>
                            {user.is_staff && 
                            <a className="option styleBtn styleBtn-outline-red" 
                                href="/reports/" 
                                title={text.reportsBtnTitle}>{text.reportsBtn}</a>}
                            <a className="option styleBtn styleBtn-outline-red"
                                href="/blackList/" 
                                title={text.blackBtnTitle}>{text.blackBtn}</a>
                        </>
                    }
                </p>
                { user.is_authenticated ?
                    <p className="login_or_logout">
                        <a href={`/users/${user.id}`} style={{color: "rgb(238, 238, 238)"}}
                        className="user_label" title={text.profileTitle}>{ user.username }</a>
                        <button className="user_btn styleBtn styleBtn-outline-red"
                        onClick={logout} title={text.logoutBtnTitle}>{text.logoutBtn}</button>
                    </p>
                    :
                    <p className="login_or_logout">
                        <a className="user_btn styleBtn styleBtn-outline-red"
                        href="/login/" title={text.loginBtnTitle}>{text.loginBtn}</a>
                        <a className="user_btn styleBtn styleBtn-outline-red"
                        href="/register/" title={text.regBtnTitle}>{text.regBtn}</a>
                    </p>
                }
            </div>
        </header>
    );
}