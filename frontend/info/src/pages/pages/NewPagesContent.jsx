import "../css/new_pages_content.css";

import axios from "axios";

import NewButton from "../reusable/NewButton.jsx";
import CancelButton from "../../reusable/CancelButton.js";
import Section from "../reusable/Section.jsx";

import {pages_api_url, get_page_tree_by_id} from "../../give_objects.js";
import { useEffect, useState } from "react";
import get_props from "./get_props.js";
import PagesRightBarPropsContent from "./rightBar/props/PagesRightBarContent.jsx";
import RightBarRequestsContent from "./rightBar/requests/RightBarRequestContent.jsx";
import AddPropFieldDialog from "./rightBar/props/AddPropFieldDialog.jsx";
import apply from "./apply.js";

function add(parent, id, value, setRightContent, setCurrentObj, props, req, childrens) {

    // если элемент существует, то он не должен отрисовывается
    if (document.getElementById(`tag_${id}`) && id !== -1) {
        return
    }

    let new_row = document.createElement("li");
    
    if (Object.keys(props).length === 0) {
        new_row.setAttribute("props", "{}");
    } else {
        new_row.setAttribute("props", JSON.stringify(props));
    }

    if (Object.keys(req).length === 0) {
        new_row.setAttribute("req", "{}");
    } else {
        new_row.setAttribute("req", JSON.stringify(req));
    }

    let cont = document.createElement("div");
    cont.className = "row-cont"
    new_row.className = "page-tree"
    new_row.id = `tag_${id}`;

    let new_row_input = document.createElement("input");
    new_row_input.className = "row-input";
    new_row_input.value = value;

    new_row_input.onclick = () => {
        setCurrentObj(new_row);
        setRightContent(
            <>
                <Section text="properties" 
                content={
                    <>
                        <div style={{paddingLeft: "10px"}}>
                            <label>Add</label>
                            <button onClick={() => document.getElementById("add-prop-field-dialog").showModal()} 
                                className="delete-row-btn">+</button>
                        </div>
                        <PagesRightBarPropsContent obj={new_row}/>
                    </>
                }/>
                <Section text="requests" 
                content={
                    <>
                        <div style={{paddingLeft: "10px"}}>
                            <button onClick={() => {
                                new_row_input.click();
                                document.getElementById("right-bar-req-content").style.display = "block";
                            }} 
                                className="delete-row-btn">+</button>
                            <button onClick={() => {
                                new_row.setAttribute("req", "{}");
                                document.getElementById("right-bar-req-content").style.display = "none";
                            }} 
                                className="delete-row-btn">-</button>
                        </div>
                        <RightBarRequestsContent obj={new_row}/>
                    </>
                }/>
                {/* <Section text="scripts" 
                content={<PagesRightBarContent obj={new_row}/>}/> */}
            </>
        );
    };

    let del_row_button = document.createElement("button");
    del_row_button.className = "delete-row-btn"
    del_row_button.innerText = '-';
    
    del_row_button.onclick = () => {
        setRightContent();
        new_row.remove();
    };

    let new_row_button = document.createElement("button");
    new_row_button.className = "delete-row-btn"
    new_row_button.innerText = '+';

    let child = document.createElement("ul");  

    // рекурсивное добавление дочерних элементов
    for (let el of childrens) {
        add(child, el.id, el.value, setRightContent, setCurrentObj, ...get_props(el.properties), el.childrens);
    }

    child.className = "page-tree";

    new_row_input.click();

    new_row_button.onclick = () => add(child, -1, "div", setRightContent, setCurrentObj, {}, {}, []);

    cont.appendChild(del_row_button);
    cont.appendChild(new_row_input);
    cont.appendChild(new_row_button);
    new_row.appendChild(cont)
    new_row.appendChild(child);

    parent.appendChild(new_row);
    return new_row;
}

function delete_page(id) {
    axios.delete(`${pages_api_url}/${id}/`)
    .then(() => {
        window.location.reload();
    });
}

// компонент редактирования страницы
export default function NewPagesContent(props) {

    // переменная хранит в себе id страницы
    let id = props.id;

    const [currentObj, setCurrentObj] = useState();

    useEffect(() => {
        // если страница уже сущетсвует, то компонент заполняется ее элементами
        let parent = document.getElementById("elements-form-list");
        props.id && get_page_tree_by_id(props.id).childrens.map(tag => add(parent, tag.id, tag.value, props.setRightContent, 
            setCurrentObj, ...get_props(tag.properties), tag.childrens));
        
        let input_name = document.getElementById("new-form-entry");
        if (input_name) {
            input_name.remove();
        }
        let row = document.getElementById("new-pages-form");
        let inp = document.createElement("input");
        inp.value = id ? get_page_tree_by_id(id).uri : "";
        inp.id = "new-form-entry";
        inp.className = "pages-form-entry";
        inp.required = true;
        row.appendChild(inp);

    });

    return (
        <div className="pages-content" id="pages-content">
            <dialog id="delete-dialog" className="delete-page-dialog">
                <CancelButton func={() => document.getElementById("delete-dialog").close()}/>
                <label style={{width: "250px", textAlign: "center"}}>Do you want delete this page?</label>
                <br/>
                <button style={{marginLeft: "195px", marginTop: "20px"}} 
                onClick={() => delete_page(props.id)} className="styleBtn styleBtn-outline-danger">Delete</button>
            </dialog>
            <AddPropFieldDialog obj={currentObj}/>
            <div style={{height: '50px', display: "flex", marginBottom: "20px"}}>
                <div id="new-pages-form" className="new-pages-form">
                    <label htmlFor="new-form-entry" id="newpa" style={{width: "55px"}}>Name: </label>
                    &nbsp;
                </div>
                {props.id && <button style={{marginTop: "23px"}} onClick={() => document.getElementById("delete-dialog").showModal()} 
                className="styleBtn styleBtn-outline-danger">Delete</button>}
            </div>
            {/* список элементов */}
            <div className="elements-form">
                <ul className="elements-form-list" id="elements-form-list">
                </ul>
                <label style={{display: "flex"}}>Elements:&nbsp;&nbsp;
                    {/* кнопка добавления элемента */}
                    <NewButton onClick={() => {
                        let parent = document.getElementById("elements-form-list");
                        add(parent, -1, "div", props.setRightContent, setCurrentObj, {}, {}, []);
                    }}/></label>
            </div>
            <button onClick={apply} className="styleBtn styleBtn-outline-ok">
                {props.id ? "Update" : "Add"}
            </button>
        </div>
    );
}