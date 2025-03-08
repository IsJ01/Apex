import { useState, useEffect } from 'react';
import axios from 'axios';

import '../css/index.css';
import '../css/buttons.css';

import { get_sessionid } from '../get_cookies.js';
import { get_organization_data } from '../give_objects.js';
import { getHeaderText } from "../getText.js";
import { getMenuBar } from './menuBar.js';

export default function Header(props) {
    const [user, setUser] = useState({});
    const [title, setTitle] = useState("");
    const api_url = "http://127.0.0.1:8001";

    useEffect(() => {
        updateTitle();
        updateUser();
    }, []);

    function updateTitle() {
        let title = get_organization_data().filter(f => f["name"] === "title");
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

    function resize() {
        document.getElementById("menuBar").remove();
        document.getElementById("header").appendChild(getMenuBar({user: user, logout: logout, 
            text: text, lang: props.lang, onSelectLang: onSelectLang, width: window.innerWidth}));
    }

    window.addEventListener("resize", resize);

    if (document.getElementById("header")) {
        if (document.getElementById("menuBar")) {
            document.getElementById("menuBar").remove();
        }
        document.getElementById("header").appendChild(getMenuBar({user: user, logout: logout, 
            text: text, lang: props.lang, onSelectLang: onSelectLang, width: window.innerWidth}));
        document.getElementById("lang-select").onchange = e => {
            props.setLang(e.target.value);
        }
    }

    return (
        <header id="header">
            <div className="title">
                <h2 style={{color: "rgb(216, 64, 64)"}}>UCOR</h2>
                <label style={{color: "rgb(216, 64, 64)"}}>{title}</label>
            </div>
        </header>
    );
}