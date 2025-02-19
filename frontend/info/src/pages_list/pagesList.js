import { Route } from "react-router-dom";
import { get_pages_tree, get_service_by_name } from "../give_objects";
import JsxParser from "react-jsx-parser";

import {TAGS} from "./tags.js";


const NPROPS = ["method", 'auto inject data', 'service', "table"];


function element(el, level, val) {
    if (TAGS.includes(el.value)) {

        let props = el.properties
        .filter(prop => !NPROPS.includes(prop.name) && prop.value !== "")
        .map(prop => `${"\t".repeat(level)}${prop.name}:${prop.value};`);

        let ser_proprs = {};
        el.properties
        .filter(prop => NPROPS.includes(prop.name))
        .map(prop => ser_proprs[prop.name] = prop.value);
        
        let values = [];
        if (ser_proprs.service && ser_proprs.method === "GET" && ser_proprs.table) {
            get_service_by_name(ser_proprs.service).tabs?.
            filter(tab => ser_proprs.table === tab.name)[0]?.
            rows.map(row => {
                values.push([]);
                row.fields.map(field => {
                    if (values[values.length - 1].length < el.childrens?.length) {
                        values[values.length - 1].push(field.value);
                    }
                })
            });
            console.log(values)
        }


        if (props) {
            props = `style="${props}"`;
        } else {
            props = "";
        }

        let tag = `${"\t".repeat(level)}<${el.value} ${props}>`+
        '\n'
        + 
        `${"\t".repeat(level)}`
        + 
        `${val ? val : ""}`
        + 
        '\n'
        + 
        `${
            !(ser_proprs.service && ser_proprs.method === "GET" && ser_proprs.table)
            ?
            el.childrens.map(
            child => element(child, level + 1)
            ).join("\n")
            :
            values.map(row => {
                return el.childrens.map(
                    child => element(child, level + 1, row[el.childrens.indexOf(child)]))
                    .join("\n");
            })
                
        }`
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