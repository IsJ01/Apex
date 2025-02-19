import "../css/new_service_content.css";

import NewButton from "../reusable/NewButton.jsx";

import { get_service_by_id, services_api_url } from "../../give_objects.js";
import { apply } from "./apply.js";

import { useEffect } from "react";
import axios from "axios";

function add_col(tab, col) {
    let tr = tab.children[0].children[0];
    tr.className = "thead-tr";
    
    let th = document.createElement("th");
    th.className = 'table-th';

    let input = document.createElement("input");
    input.required = true;
    input.onfocus = () => {
        tab.children[0].current = th;
        th.style.borderColor = "red";
    };
    input.onblur = () => {
        th.style.borderColor = "black";
    };
    input.className = "th-input";
    input.value = col.name;
    th.appendChild(input);

    for (let tr of tab.children[1].children) {
        let td = document.createElement("td");
        td.className = "table-td";

        let input = document.createElement("input");
        input.className = "td-input";

        
        td.appendChild(input);

        tr.appendChild(td);
    }

    tr.appendChild(th);
}

function add_row(tab, row) {
    let tbody = tab.children[1];
    
    let tr = document.createElement("tr");
    tr.setAttribute("id", row.id)
    tr.className = 'thead-tr';
    for (let i = 0; i < tab.children[0].children[0].children.length; i++) {
        let td = document.createElement("td");
        td.className = "table-td";

        let input = document.createElement("input");
        input.className = "td-input";
        if (row.fields[i]) {
            input.value = row.fields[i].value;
        }
        
        td.appendChild(input);

        tr.appendChild(td);
    }

    tbody.insertBefore(tr, null)

}

function delete_column(table) {
    let thead = table.children[0];
    let tbody = table.children[1];

    if (!thead.current) {
        alert("Please, select column");
        return
    }

    let ind = [...thead.children[0].children].indexOf(thead.current);

    for (let row of tbody.children) {
        for (let td in row.children) {
            if (td === ind) {
                row.children[td].remove();
            }
        }
    }
    
    thead.current.remove();

}

function add(id, tab) {
    let li = document.createElement("li");
    li.className = "table-list-row";
    
    let tab_name_label = document.createElement("label");
    tab_name_label.innerText = "Table name:";
    tab_name_label.className = "tab-name-label";

    let tab_name_input = document.createElement("input");
    tab_name_input.value = tab.name;
    tab_name_input.className = "tab-name-input";

    let table_cont = document.createElement("div");
    table_cont.appendChild(tab_name_label);
    table_cont.appendChild(tab_name_input);
    table_cont.className = "table-cont";

    let table = document.createElement("table");
    table_cont.appendChild(table);

    let thead = document.createElement("thead");
    let thead_row = document.createElement("tr");
    thead_row.className = "thead-tr";
    thead.appendChild(thead_row);

    thead.className = "thead-content";

    let tbody = document.createElement("tbody");
    tbody.className = "tbody-content";
    
    table.className = "table-content";

    table.appendChild(thead);
    table.appendChild(tbody);

    li.appendChild(table_cont);

    let rightPanel = document.createElement("div");

    let col_label = document.createElement("label");
    col_label.innerText = "Column";
    let new_header_btn = document.createElement("button");
    new_header_btn.innerText = '+';
    new_header_btn.title = "Add new column";
    new_header_btn.className = "row-btn";

    let row_label = document.createElement("label");
    row_label.innerText = "Row";
    let new_row_btn = document.createElement("button");
    new_row_btn.innerText = '+';
    new_row_btn.title = "Add new row";
    new_row_btn.className = "row-btn";

    let table_label = document.createElement("label");
    table_label.innerText = "Drop table";
    let table_del_btn = document.createElement("button");
    table_del_btn.innerText = '-';
    table_del_btn.title = "Drop table";
    table_del_btn.className = "row-btn";

    let del_col_label = document.createElement("label");
    del_col_label.innerText = "Delete column";
    let del_col_btn = document.createElement("button");
    del_col_btn.innerText = '-';
    del_col_btn.title = "Delete column";
    del_col_btn.className = "row-btn";
    
    tab.cols.map(col => add_col(table, col));
    tab.rows.map(row => add_row(table, row));

    new_header_btn.onclick = () => add_col(table, {id: -1, name: ""});
    new_row_btn.onclick = () => add_row(table, {id: -1, fields: []});
    table_del_btn.onclick = () => li.remove();
    del_col_btn.onclick = () => delete_column(table);

    rightPanel.appendChild(col_label);
    rightPanel.appendChild(new_header_btn);
    rightPanel.appendChild(row_label);
    rightPanel.appendChild(new_row_btn);
    rightPanel.appendChild(table_label);
    rightPanel.appendChild(table_del_btn);
    rightPanel.appendChild(del_col_label);
    rightPanel.appendChild(del_col_btn);

    li.appendChild(rightPanel)

    document.getElementById(id).appendChild(li);
}

export default function NewServiceContent(props) {

    let id = props.id;

    useEffect(() => {
        let inp = document.getElementById("new-service-name");
        if (!inp) {
            let row = document.getElementById("new-service-form");
            inp = document.createElement("input");
            inp.id = "new-service-name";
            inp.className = "service-form-entry";
            inp.required = true;
            inp.setAttribute("s_id", id);
            row.appendChild(inp);
        }
        
        let service = get_service_by_id(id);
        if (!service.error) {
            let form = document.getElementById("new-service-form");
            let del_btn = document.getElementById("del_ser_btn");
            if (!del_btn) {
                del_btn = document.createElement("button");
                del_btn.id = "del_ser_btn";
                del_btn.innerText = "Delete";
                del_btn.className = "styleBtn styleBtn-outline-danger";
                del_btn.onclick = async () => {
                    await axios.delete(`${services_api_url}/${id}/`);
                    window.location.reload();
                };
                form.appendChild(del_btn);
            }
                
            inp.value = service.name;
            document.getElementById("tables-list").innerHTML = "";
            service.tabs.map(tab => add("tables-list", tab));
        }
    });

    return (
        <div className="new-service-content">
            <div className="new-service-form" id="new-service-form">
                <label htmlFor="new-service-name" className="service-label">Name: </label>
                <input className="service-form-entry" id="new-service-name" name="service-name"/>
            </div>
            <ul id="tables-list" className="tables-list">

            </ul>
            <div className="elements-form">
                <ul className="elements-form-list" id="elements-form-list">
                </ul>
                <label style={{display: "flex"}}>
                    Tables:
                    &nbsp;&nbsp;
                    <NewButton onClick={() => {
                        add("tables-list", {cols: [], rows: [], name: ""});
                    }}/>
                </label>
            </div>
            <button onClick={async () => {
                    await apply(id); 
                    window.location.reload();
            }} className="styleBtn styleBtn-outline-ok">
                {id ? "Update" : "Add"}
            </button>
        </div>
    );
}