import "./css/pages.css";
import LeftBar from "./LeftBar.jsx";
import Central from "./Central.jsx";
import RightBar from "./RightBar.jsx";
import { useState } from "react";

export default function Pages() {

    const [centralContent, setCentralContent] = useState();
    const [rightContent, setRightContent] = useState();

    return (
        <div className="pages">
            <LeftBar setContent={setCentralContent} setRightContent={setRightContent}/>
            <Central content={centralContent} />
            <RightBar content={rightContent} />
        </div>
    );
}