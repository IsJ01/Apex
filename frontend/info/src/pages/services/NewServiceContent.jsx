import axios from "axios";
import "../css/new_service_content.css";

import NewButton from "../reusable/NewButton.jsx";

import {fields_api_url, rows_api_url, services_api_url} from "../../give_objects.js";


function add(id) {
    let new_row = document.createElement("div");
    new_row.style.display = "flex";
    new_row.style.alignItems = "center";

    let new_row_label = document.createElement("label");
    new_row_label.innerText = "Name: ";

    let new_row_input = document.createElement("input");
    new_row_input.style.height = "25px";

    let new_row_button = document.createElement("button");
    new_row_button.style.border = "1px solid black";
    new_row_button.style.background = "white";
    new_row_button.style.borderRadius = "5px";
    new_row_button.style.width = "25px";
    new_row_button.style.height = "25px";
    new_row_button.style.lineHeight = "20px";
    new_row_button.style.fontSize = "25px";
    new_row_button.style.textAlign = "center";
    new_row_button.style.padding = "0px 0px 3px 1px";
    new_row_button.innerText = '-';

    new_row_button.onclick = () => new_row.remove();

    new_row.appendChild(new_row_label);
    new_row.appendChild(new_row_input);
    new_row.appendChild(new_row_button);
    
    document.getElementById(id).appendChild(new_row);
    return new_row;
}

function addField(id) {
    let new_row = add(id);

    let row_name_label = document.createElement("label");
    row_name_label.innerText = "Row (name): ";
    row_name_label.style.marginLeft = "20px";

    let row_name_field = document.createElement("input");
    row_name_field.style.height = "25px";
    
    
    new_row.insertBefore(row_name_label, new_row.children[2]);
    new_row.insertBefore(row_name_field, new_row.children[3]);
}

function apply() {
    let service_name = document.getElementById("new-service-name").value;

    let rows = {};

    for (let row of document.getElementById("rows-form-list").children) {
        rows[row.children[1].value] = []
        for (let field of document.getElementById("fields-form-list").children) {
            if (row.children[1].value == field.children[3].value) {
                rows[row.children[1].value].push(field);
            }
        }
    }

    axios.post(`${services_api_url}/`, {
        name: service_name
    })
    .then(res => {
        for (let row in rows) {
            axios.post(`${rows_api_url}/`, {
                name: row,
                serviceId: res.data.id
            })
            .then(res2 => {
                axios.post(`${fields_api_url}/`, {
                    rowId: res2.data.id,
                    name: rows[row][0].children[1].value
                });
            });
        }
    })
    .then(() => window.location.reload());;
}

export default function NewServiceContent() {
    return (
        <div className="new-service-content">
            <div className="new-service-form">
                <label htmlFor="new-service-name">Name: </label>
                <input className="service-form-entry" id="new-service-name" name="service-name"/>
            </div>
            <div className="rows-form">
                <label style={{display: "flex"}}>Rows:&nbsp;&nbsp;<NewButton onClick={() => add("rows-form-list")}/></label>
                <div className="rows-form-list" id="rows-form-list">

                </div>
            </div>
            <div className="fields-form">
                <label style={{display: "flex"}}>Fields:&nbsp;&nbsp;
                    <NewButton onClick={() => addField("fields-form-list")}/></label>
                <div className="fields-form-list" id="fields-form-list">
                    
                </div>
            </div>
            <button onClick={apply} className="styleBtn styleBtn-outline-ok">Add</button>
        </div>
    );
}