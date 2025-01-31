import { useEffect } from "react";
import getContent from "./getContent.js";
import addReqField from "./addReqField.js";

export default function RightBarRequestsContent(props) {
    
    useEffect(() => {
        document.getElementById("right-bar-req-content").innerHTML = "";
        let content = getContent(props.obj);
        content.map(obj => addReqField(obj[0], obj[1], obj[2], "right-bar-req-content", props.obj));
    });

    return (
        <div className="right-bar-content" id="right-bar-req-content">
        </div>
    );
}
