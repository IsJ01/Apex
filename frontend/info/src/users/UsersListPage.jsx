import "./css/users_list.css";

import { useState } from "react";
import UsersList from "./UsersList.jsx";
import Image from "../reusable/Image";
import userImg from "./img/User.png";
import userImgHover from "./img/UserHover.png";
import statistic from "./img/Statistic.png";
import statisticHover from "./img/StatisticHover.png";
import Statistic from "./Statistic.jsx";

export default function UsersListPage(props) {

    const [mode, setMode] = useState("users");

    let content;

    if (mode === "users") {
        content = <UsersList lang={props.lang}/>;
    } 
    if (mode === "statistic") {
        content = <Statistic lang={props.lang}/>;
    }

    return (
        <div className="users-list-page">
            <div className="reports-menu-cont">
                <div className="reports-menu">
                    <div title="Users" className="reports-menu-btn" onClick={() => setMode("users")}>
                        <Image hoverSrc={userImgHover} src={userImg}/>
                    </div>
                    <div title="Statistic" className="reports-menu-btn" onClick={() => setMode("statistic")}>
                        <Image hoverSrc={statisticHover} src={statistic}/>
                    </div>
                </div>
            </div>
            {content}
        </div>
    );
}