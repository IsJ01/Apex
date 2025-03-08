import { useState } from "react";
import NewChart from "./NewChart";
import { get_report_categories, get_user_from_email, get_users, 
    reports_api_url, get_report_category_by_name } from "../give_objects";
import axios from "axios";
import * as XLSX from "xlsx";
import { get_sessionid } from "../get_cookies";

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

function get_file_data() {
    return new Promise(resolve => {
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
            resolve(data);
        }
        reader.readAsArrayBuffer(inp.files[0]);
    }) 
}

function create_report(of) {
    let data = new FormData()
    
    const to = get_user_from_email(document.getElementById("new-report-to").value).id;
    const title = document.getElementById("new-report-title").value;
    const description = document.getElementById("new-report-description").value;
    const category = get_report_category_by_name(document.getElementById("new-report-category").value).id;
    const file = document.getElementById("report-file-inp").files[0];

    data.append("of", of);
    data.append("to", to);
    data.append("title", title);
    data.append("description", description);
    data.append("category", category);
    data.append("file", file);

    axios.post(`${reports_api_url}/`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            "sessionid": get_sessionid()
        }
    }).then(res => create_chart(res.data.id))
    .then(() => window.location.reload());

    
}

async function create_chart(report_id) {
    let chartType;
    let labels;
    let values;
    if (document.getElementById("chart-file-inp")) {
        let data = await get_file_data();
        chartType = document.getElementById("report-chart-type").value;
        labels = data[0];
        values = data[1];
        if (labels.length == 0) {
            return
        }
    } else if (document.getElementById("new-chart-fields")) {
        chartType = document.getElementById("report-chart-type").value;
        labels = get_data()[0];
        values = get_data()[1];

        if (labels.length == 0) {
            return
        }
    }
    else {
        return
    }

    await axios.post(`${reports_api_url}/charts/`, {
        report: report_id,
        type: chartType
    })
    .then(async res => {
        for (let ind in labels) {
            await axios.post(`${reports_api_url}/labels/`,
            {
                chart: res.data.id,
                content: labels[ind]
            },
            {
                headers: {"sessionid": get_sessionid()}
            }).then(() => {
                axios.post(`${reports_api_url}/values/`,
                    {
                        chart: res.data.id,
                        content: values[ind]
                    },
                    {
                        headers: {"sessionid": get_sessionid()}
                    })
            })
            
        }
    });
}

export default function NewReport(props) {
    
    const [mode, setMode] = useState("list");

    let content;

    const categories = get_report_categories().map(c => <option>{c.name}</option>)
    const users = get_users().filter((u) => props.user.id !== u.id).map(u => <option>{u.email}</option>)
    if (mode === "new") {
        content = <NewChart/>
    }
    
    return (
        <div className="new-report">
            <div className="new-report-fields">
                <div className="new-report-field">
                    <label>To</label>
                    <select id="new-report-to" className="new-report-input">
                        {users}
                    </select>
                </div>
                <div className="new-report-field">
                    <input className="new-report-input" id="new-report-title" placeholder="Title"/>
                </div>
                <div className="new-report-field">
                    <textarea className="new-report-textarea" id="new-report-description" placeholder="Description"/>
                </div>
                <div className="new-report-field">
                    <label>Category</label>
                    <select id="new-report-category" className="new-report-input">
                        {categories}
                    </select>
                </div>
                <div className="new-report-field">
                    <label htmlFor="report-file-inp">
                        <input style={{display: "none"}} id="report-file-inp" type="file"/>
                        <span className="file-span">File</span>
                        <span className="file-spanp-name"></span>
                    </label>
                </div>
                <div className="new-report-field">
                    <label>Chart</label>
                    &nbsp;
                    <div className="add-chart-btn" onClick={() => setMode("new")}>+</div>
                </div>
                <div className="new-report-field">
                    <button className="styleBtn styleBtn-outline-red-2" onClick={() => create_report(props.user.id)}>Add</button>
                </div>
            </div>
            <div className="new-report-charts">
                {content}
            </div>
        </div>
    );
}