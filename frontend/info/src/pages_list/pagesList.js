import { Route } from "react-router-dom";
import { get_pages_tree } from "../give_objects";
import JsxParser from "react-jsx-parser";

import {TAGS} from "./tags.js";


const NPROPS = ["method", 'auto inject data', 'service'];


function element(el, level) {
    if (TAGS.includes(el.value)) {

        let props = el.properties
        .filter(prop => !NPROPS.includes(prop) && prop.value !== "")
        .map(prop => `${"\t".repeat(level)}${prop.name}:${prop.value};`);

        if (props) {
            props = `style="${props}"`;
        } else {
            props = "";
        }

        let tag = `${"\t".repeat(level)}<${el.value} ${props}>`
        + 
        '\n'
        + 
        el.childrens.map(
            child => element(child, level + 1)
        ).join("\n")
        +
        '\n'
        + 
        `${"\t".repeat(level)}</${el.value}>`;
        return tag;
    } else {
        return "\t".repeat(level) + "<>" + el.value + "</>";
    }

}

export default function PagesList() {
    let routes = [];
    for (let page of get_pages_tree()) {
        let pageContent;
        let elements = [];
        for (let el of page.childrens) {
            elements.push(element(el, 0));
        }
        pageContent = (
            <div style={{marginTop: "50px"}} id={page.uri}>
                <JsxParser jsx={"<>" + elements.join("\n") + "</>"}/>
            </div>
        );
        routes.push(<Route path={page.uri} element={pageContent}/>)
    }
    return routes;
}