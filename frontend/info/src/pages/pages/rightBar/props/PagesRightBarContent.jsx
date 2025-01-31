import { useEffect } from "react";
import getContent from "./getContent.js";
import addPropField from "./addPropField.js";

export default function PagesRightBarPropsContent(props) {
    
    useEffect(() => {
        document.getElementById("right-bar-content").innerHTML = "";
        let content = getContent(props.obj);
        let propss = JSON.parse(props.obj.getAttribute("props"));
        if (Object.keys(propss).length !== 0) {
            Object.keys(propss).map(key => {
                if (content.has(key)) {
                    addPropField(key, content.get(key), "right-bar-content", props.obj);
                } else {
                    addPropField(key, propss[key], "right-bar-content", props.obj);
                }
            })
        } else {
            content.forEach((value, key) => addPropField(key, value, "right-bar-content", props.obj));
        }
        
    });

    return (
        <div className="right-bar-content" id="right-bar-content">
        </div>
    );
}
