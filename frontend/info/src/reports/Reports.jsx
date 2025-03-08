import { useState, useEffect } from "react";
import axios from "axios";
import { get_report_categories, users_api_url } from "../give_objects";
import { get_sessionid } from "../get_cookies";
import './css/reports.css';

import Image from "../reusable/Image.jsx";

import add from "./img/Add.png";
import addHover from "./img/AddHover.png";
import filter from "./img/Filter.png";
import filterHover from "./img/FilterHover.png";
import toYou from "./img/ToYou.png";
import toYouHover from "./img/ToYouHover.png";
import your from "./img/Your.png";
import yourHover from "./img/YourHover.png";
import NewReport from "./NewReport.jsx";
import ReportsList from "./ReportsList.jsx";


export default function Reports() {
    const [user, setUser] = useState({});
    const [mode, setMode] = useState("your");
    const [catFilter, setCatFilter] = useState("");

    useEffect(() => {
        updateUser();
    }, []);

    document.title = "Reports";

    let categories = get_report_categories();

    function updateUser() {
        let sessionid = get_sessionid();
        axios.get(`${users_api_url}/current/`, 
            {headers: {'sessionid': sessionid}}).then(res => {
            if (res.data.is_authenticated) {
                setUser(res.data);
            }
        });
    }

    let content;
    if (mode === "new") {
        content = <NewReport user={user}/>;
    }
    if (mode === "your") {
        content = <ReportsList mode="of" catFilter={catFilter} setCatFilter={setCatFilter} user={user}/>
    }
    if (mode === "toYou") {
        content = <ReportsList mode="to" catFilter={catFilter} setCatFilter={setCatFilter} user={user}/>;
    }

    return (
        <>
            {user.is_authenticated ? 

            <div className="reports-page">
                <div className="reports-menu-cont">
                    <div className="reports-menu">
                        <div title="Add" className="reports-menu-btn" onClick={() => setMode("new")}>
                            <Image hoverSrc={addHover} src={add}/>
                        </div>
                        <div title="Your" className="reports-menu-btn" onClick={() => setMode("your")}>
                            <Image hoverSrc={yourHover} src={your}/>
                        </div>
                        <div title="To you" className="reports-menu-btn" onClick={() => setMode("toYou")}>
                            <Image hoverSrc={toYouHover} src={toYou}/>
                        </div>
                        <div title="Filter" className="reports-menu-btn" onClick={() => {
                            catFilter === "" ? setCatFilter(categories[0]["name"]) : setCatFilter("") 
                            }}>
                            <Image hoverSrc={filterHover} src={filter}/>
                        </div> 
                    </div>
                </div>
                <div className="reports-content">
                    {content}
                </div>
            </div>
            :
            <h1 style={{width: '100%', height: '100%', paddingTop: '20%', paddingLeft: '35%'}}>
                This page is only available to users
            </h1>}
        </>
    );
}