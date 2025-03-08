import { useEffect } from "react";
import update_chart from "./update_chart";
import * as XLSX from 'xlsx';

function add_field(mode, type) {
    let fields = document.getElementById("new-chart-fields");

    let field = document.createElement("div");
    
    let name_inp = document.createElement("input");
    let value_inp = document.createElement('input');

    name_inp.className = "new-report-input chart-field-input";
    name_inp.placeholder = "Name";
    name_inp.onchange = () => draw_chart(mode, type);
    field.appendChild(name_inp);

    value_inp.className = "new-report-input chart-field-input";
    value_inp.placeholder = "Value"; 
    value_inp.onchange = () => draw_chart(mode, type);
    value_inp.type = 'number';
    field.appendChild(value_inp);  
    
    if (mode === "Graph") {
        name_inp.placeholder = "X";
        value_inp.placeholder = "Y";
        name_inp.type = 'number';
    }    

    fields.appendChild(field);

    update_fields(mode, type);

}

function update_fields(mode, type) {
    let fields = document.getElementById("new-chart-fields");
    let childrens = [...fields.children];
    for (let ind in childrens) {
        if (mode === "Graph") {
            childrens[ind].children[0].type = "number";
            childrens[ind].children[0].placeholder = "X";
            childrens[ind].children[1].placeholder = "Y";
        } else {
            childrens[ind].children[0].type = "text";
            childrens[ind].children[0].placeholder = "Name";
            childrens[ind].children[1].placeholder = "Value";
        }
        if (ind < fields.children.length - 2) {
            if (childrens[ind].children.length === 3) {
                childrens[ind].children[`2`].remove();
            }
        } else {
            if (childrens[ind].children.length === 3) {
                childrens[ind].children[`2`].remove();
            }
            if (ind == fields.children.length - 2) {
                let del_btn = document.createElement("div");
                del_btn.className = "add-chart-btn field-btn";
                del_btn.innerText = "−";
                del_btn.onclick = () => {childrens[ind].remove(); update_fields()};
                childrens[ind].appendChild(del_btn);
            }
            if (ind == fields.children.length - 1) {
                let add_btn = document.createElement("div");
                add_btn.className = "add-chart-btn field-btn";
                add_btn.innerText = "+";
                add_btn.onclick = () => add_field(mode, type);
                childrens[ind].appendChild(add_btn);
            }
        }
    }

    draw_chart(mode, type);
}

function get_data() {
    let fields = document.getElementById("new-chart-fields");
    let childrens = [...fields.children];

    let labels = [];
    let data = [];

    for (let field of childrens) {
        if (field.children[0].value) {
            labels.push(field.children[0].value);
            data.push(field.children[1].value);
        }
    }
    return [labels, data];
}

function draw_chart(mode, type) {
    update_chart("new-chart", get_data(mode, type));
}

function uploadFile() {
    let inp = document.getElementById("chart-file-inp");
    inp.click();
}

function download_file() {
    let inp = document.getElementById("chart-file-inp");
    let reader = new FileReader();
    reader.onload = e => {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, {type: "array"});
        let sheet1 = workbook.Sheets[workbook.SheetNames[0]];
        let csvData = XLSX.utils.sheet_to_csv(sheet1);
        csvData = csvData.split("\n");
        data = [[], []];
        for (let row of csvData) {
            data[0].push(row.split(",")[0]);
            data[1].push(row.split(",")[1]);
        }
        update_chart("new-chart", data);
    }
    reader.readAsArrayBuffer(inp.files[0]);
}

export default function FieldsInput(props) {

    useEffect(() => {
        let fields = document.getElementById("new-chart-fields");
        if (props.inpType === "Fields") {
            if (fields.children.length === 0) {
                add_field(props.mode, props.type);
            }
            update_fields(props.mode, props.type);
        } else {
            if (document.getElementById("chart-file-inp").files[0]) {
                download_file();
            }
            for (let ch of fields.children) {
                if (ch.id !== "file-inp") {
                    ch.remove();
                }
            }
        }
    });

    let file_inp;

    if (props.inpType === "File") {
        file_inp = 
                <div id="file-inp">
                    <label htmlFor="chart-file-inp">
                        <input onChange={download_file} style={{display: "none"}} id="chart-file-inp" type="file"/>
                    </label>
                    <div onClick={uploadFile} className="file-span">File</div>
                </div>
    }

    return (
        <div id="new-chart-fields" className="new-chart-fields">
            {file_inp}
        </div>
    );
}