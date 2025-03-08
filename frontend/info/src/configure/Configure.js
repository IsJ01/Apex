import { useState, useEffect, } from "react";
import axios from "axios";

import { get_sessionid } from "../get_cookies.js";
import SideBar from '../reusable/SideBar.js';
import './css/configure.css';
import './css/fields.css';
import CancelButton from "../reusable/CancelButton.js";
import { get_black_list, report_categories_api_url } from "../give_objects.js";
import Cell from "./Cell.js";
import { getConfigurationText } from "../getText.js";

function Fields(props) {

    const [t1, setT1] = useState("")

    const COLUMN_WIDTH = '80px';

    let headers = props.headers.map(row => <th className="table-col" 
        style={{minWidth: COLUMN_WIDTH, textAlign: "center"}}>{row}</th>);
    
    function focusOut(event) {
        event.target.style.color = 'black';
    }

    let rows = props.rows.map(row => 
        (row && !row.delete) &&
        <tr>
            <td className={`table-col`} onClick={props.onclick} title="Click to select"
                style={{textAlign: "center", minWidth: COLUMN_WIDTH, overflow: "hidden"}}>
                {row.id.tag == "input" ? 
                <input onBlur={focusOut} className={`fields-input`} type={row.id.isId ? 'button' : 'text'} id={row.id.text} 
                value={row.id.text} style={{textAlign: "center", maxWidth: COLUMN_WIDTH, overflow: "hidden", 
                    background: 'none', cursor: "pointer"}}/> : row.id.text}
            </td>
            <Cell COLUMN_WIDTH={COLUMN_WIDTH} focusOut={focusOut} col={row.col1}/>
            {row.col2 ? <Cell COLUMN_WIDTH={COLUMN_WIDTH} focusOut={focusOut} col={row.col2} />
            :
            <></>}
        </tr>
    );
    return (
        <table className="fields-table" id="fields">
            <thead className="fields-head">
                <tr>
                    {headers}
                </tr>
            </thead>
            <tbody className="fields-body" id="fields-body">
                {rows}
            </tbody>
        </table>
    );
}

export default function Configure(props) {
    const [user, setUser] = useState({});
    // тип поля
    const [type, setType] = useState("Organization");
    // поля таблицы
    const [rows, setRows] = useState([]);
    const [objects, setObjects] = useState([]);
    // выделенное поле
    const [selectedRow, setSelectedRow] = useState({});
    // поля, которые в таблице
    const [inBlackList, setInBlackList] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const users_api_url = "http://127.0.0.1:8001";
    const data_api_url = "http://127.0.0.1:8004";
    const user_categories_api_url = "http://127.0.0.1:8005";
    let headers = [];
    let text = getConfigurationText(props.lang);

    useEffect(() => {
        update_user();
        select({target: {value: "Organization"}})
    }, []);

    document.title = "Configure";

    // функция предоставляет нам авторизованного пользователя
    function update_user() {
        let sessionid = get_sessionid();
        axios.get(`${users_api_url}/current/`, 
            {headers: {'sessionid': sessionid}}).then(res => {
            if (res.data.is_authenticated) {
                setUser(res.data);
            }
            
            let black_list = get_black_list();
            let u = black_list.filter(u => u["user"] == res.data.id);
            if (u.length == 1) {
                setInBlackList(true);
            }
        });
    }

    // функция закрывает диалог добавления нового пользователя
    function close_dialog() {
        document.getElementById('dialog').close();
    }

    // функция добавляет пользователя в таблицу
    function add_user() {
        let [id, col1, col2] = document.getElementById('users_select').value.split(";");
        if (!id) {
            return;
        }
        let row;
        if (type == 'staff' || type == 'organization') {
            row = {
                id: {tag: 'input', text: id, isId: true}, 
                col1: {tag: 'label', id: `${id}_1`, text: col1},
                col2: {tag: 'label', id: `${id}_2`, text: col2}
            };
        }
        else {
            row = {
                id: {tag: 'input', text: id, isId: true}, 
                col1: {tag: 'label', id: `${id}_1`, text: col1}
            };
        }
        setSelectedRows([...selectedRows, objects.filter(user => user.id == id)[0]]);
        setObjects(objects.filter(user => user.id != id));
        setRows([...rows, row]);
    }

    // в зависимости от того, что мы хотим натсроить, функция обновляет все поля
    function select(event) {
        if (event.target.value == text.orgTitle) {
            axios.get(data_api_url).then(res => {
                // структура таблица такова: каждая строчка имеет по две-три строки, которые имеют текс, id и класс, а также тег
                let rows = res.data.map(field => (
                    {
                        id: {tag: 'input', className: 'field-input', text: field.id, isId: true}, 
                        col1: {tag: 'input', className: 'field-input', id: `${field.id}_1`, text: field.name},
                        col2: {tag: 'input', className: 'field-input', id: `${field.id}_2`, text: field.value}
                    }
                ));
                setRows(rows);
                setSelectedRows(res.data);
                setSelectedRow({});
                setObjects([]);
                setType('organization');
            });
        }
        if (event.target.value == text.uCat) {
            axios.get(user_categories_api_url).then(res => {
                let rows = res.data.map(field => (
                    {
                        id: {tag: 'input', className: 'field-input', text: field.id, isId: true}, 
                        col1: {tag: 'input', className: 'field-input', id: `${field.id}_1`, text: field.name},
                    }
                ));
                setRows(rows);
                setSelectedRows(res.data);
                setSelectedRow({});
                setObjects([]);
                setType('user category');
            });
        }
        if (event.target.value == text.rCat) {
            axios.get(report_categories_api_url).then(res => {
                let rows = res.data.map(field => (
                    {
                        id: {tag: 'input', className: 'field-input', text: field.id, isId: true}, 
                        col1: {tag: 'input', className: 'field-input', id: `${field.id}_1`, text: field.name},
                    }
                ));
                setRows(rows);
                setSelectedRows(res.data);
                setSelectedRow({});
                setObjects([]);
                setType('report category');
            });
        }
        if (event.target.value == text.staffTitle) {
            axios.get(users_api_url).then(res => {
                let rows = res.data.map(field => (field.is_staff &&
                    {
                        id: {tag: 'input', text: field.id, isId: true}, 
                        col1: {tag: 'label', id: field.email, text: field.email},
                        col2: {tag: 'label', id: field.username, text: field.username}
                    }
                ));
                setSelectedRows(res.data.filter(user => user.is_staff));
                setSelectedRow({});
                setObjects(res.data.filter(user_ => !user_.is_staff && !user_.is_superuser));
                setRows(rows.filter(row => typeof row == 'object'));
                setType('staff');
            });
        }
        if (event.target.value != text.staffTitle) {
            setSelectedRows([]);
            setSelectedRow({});
            setObjects([]);
        }
    }

    if (type == 'staff') {
        headers = ["Id", "Email", "Name"];
    } else if (type == 'organization') {
        headers = ["Id", "Name", "Value"];
    } else {
        headers = ['Id', "Name"];
    }

    // эта функция выделяет поле
    function select_row(event) {
        for (let child of document.getElementById('fields-body').children) {
            child.children[0].children[0].style.color = 'black';
        }
        setSelectedRow(selectedRows.filter(user => user.id == event.target.value)[0]);
        event.target.style.color = 'red';
    }

    // функция добавляет поле в таблицу
    function addField() {
        if (type == 'staff') {
            document.getElementById('dialog').showModal();
        } else {
            let count = 0;
            for (let r of rows) {
                if (r.id.text[0] == '?') {
                    count++;
                }
            }
            count++;
            let row;
            // если поле новое, то его индекс помечается как '?'
            if (type == 'organization') {
                row = {
                    id: {tag: 'input', text: `?_${count}`, isId: true}, 
                    col1: {tag: 'input', id: `?_${count}_1`, text: ""},
                    col2: {tag: 'input', id: `?_${count}_2`, text: ""}
                }
                setSelectedRows([...selectedRows, {id: `?_${count}`, name: "", value: ""}])
            } else {
                row = {
                    id: {tag: 'input', text: `?_${count}`, isId: true}, 
                    col1: {tag: 'input', id: `?_${count}_1`, text: ""},
                }
                setSelectedRows([...selectedRows, {id: `?_${count}`, name: ""}])
            }
            setRows([...rows, row]);
        }
    }

    // данная функция удаляет выделенное поле из таблицы
    function delete_field() {
        if (type == 'staff') {
            if (!selectedRow || selectedRow.is_superuser) {
                if (selectedRow.is_superuser) {
                    alert("This user is admin");
                }
                return;
            }
            setObjects([...objects, selectedRow]);
            setSelectedRows(selectedRows.filter(user => user != selectedRow));
            setRows(rows.filter(row => row.id.text != selectedRow.id));
            setSelectedRow({});

        }
        else {
            setSelectedRows(selectedRows.map(row => row != selectedRow ? row : {...row, delete: true}));
            setRows(rows.map(row => row.id.text != selectedRow.id ? row : {...row, delete: true}));
            setSelectedRow({});
        }
        for (let child of document.getElementById('fields-body').children) {
            child.children[0].children[0].style.color = 'black';
        }
    }

    // данная функция отпраляет данные на сервер
    async function apply() {
        let url;
        if (type == 'staff') {
            // если пользователь в таблице - то он становится членом персонала
            for (let row of selectedRows) { 
                if (row && !row.delete) {
                    await axios.patch(`${users_api_url}/${row.id}/`, {is_staff: true}, {
                        headers: {sessionid: get_sessionid()}
                    }).catch(err => console.log(err));
                }
            }
            // в противном случае - он лишается этого статуса
            for (let row of objects) {
                    console.log(row)
                    await axios.patch(`${users_api_url}/${row.id}/`, {is_staff: false},
                        {headers: {sessionid: get_sessionid()}}
                    ).catch(err => console.log(err));
            }
            }
        else {
            if (type == 'user category') {
                url = user_categories_api_url;
            }
            if (type == 'report category') {
                url = report_categories_api_url;
            }
            if (type == 'organization') {
                url = data_api_url;
            }
            // здесь в цикле мы проходим по тем объектам, что остались в поле
            for (let row of selectedRows) {
                // если объекту не присвоен статус удаления, то он или обновляется или добаляется
                if (row && !row.delete) {
                    if (type == 'organization') {
                        let name = document.getElementById(`${row.id}_1`).value;
                        let value = document.getElementById(`${row.id}_2`).value;
                        // общая работа такова у всех: если id начинается с ?, то объект добавляется
                        if (row.id[0] == '?') {
                            for (let r of selectedRows) {
                                if (r.name == name) {
                                    return;
                                }
                            }
                            axios.post(`${url}/`, 
                                {name: name, value: value},
                                {headers: {sessionid: get_sessionid()}}
                            ).catch(err => console.log(err));
                        } 
                        // если он уже есть, то он обновляется
                        else {
                            axios.put(`${url}/${row.id}/`, {name: name, value: value}, 
                                {headers: {sessionid: get_sessionid()}}).catch(err => console.log(err));
                        }
                    } 
                    else {
                        let name = document.getElementById(`${row.id}_1`).value
                        if (row.id[0] == '?') {
                            for (let r of selectedRows) {
                                if (r.name == name) {
                                    return;
                                }
                            }
                            axios.post(`${url}/`, {name: name}, 
                                {headers: {sessionid: get_sessionid()}}).catch(err => console.log(err));
                        } else {
                            axios.put(`${url}/${row.id}/`, {name: name}, 
                                {headers: {sessionid: get_sessionid()}}).catch(err => console.log(err));
                        }
                    }
                // удаление объекта
                } else if (row && row.delete && row.id[0] != '?') {
                    axios.delete(`${url}/${row.id}/`, { headers: {sessionid: get_sessionid()} }
                    ).catch(err => console.log(err.response));
                }
            }
        }
        window.location.reload();
    }

    return (
        <>
        {((user.is_staff || user.is_superuser) && !inBlackList) ?
            <>
                {type == 'staff' && <dialog className="users_dialog" id="dialog">
                    <form method="dialog">
                        <CancelButton func={close_dialog}/>
                        <div className="select_bar">
                            <label>Name: </label>
                            <select className="users_select" id="users_select">{objects.map(user => 
                            <option>
                                {user.id};{user.email};{user.username}
                            </option>)}</select>
                        </div>
                        <div className="users_dialog_buttons">
                            <button className="user_dialog_btn" onClick={add_user}>Add</button>
                            <button className="user_dialog_btn" type="button" onClick={close_dialog}>Cancel</button>
                        </div>
                    </form>
                </dialog>}
                <div className="main">
                    <SideBar rows={[{[text.listTitle]: [
                                {onclick: select, className: 'chapter', id: 'chapter-1', text: text.orgTitle, focus: true},
                                {onclick: select, className: 'chapter', id: 'chapter-2', text: text.uCat, focus: false},
                                {onclick: select, className: 'chapter', id: 'chapter-3', text: text.rCat, focus: false},
                                {onclick: select, className: 'chapter', id: 'chapter-4', text: text.staffTitle, focus: false}
                            ]}]}/>
                    <div className="central" id="central">
                        <div className="fields" id="fields">
                            <Fields type={type} rows={rows} headers={headers} onclick={select_row}/>
                            <div className="buttons">
                                <input type="button" onClick={addField} id="add" className="styleBtn styleBtn-outline-new"
                                    title="Add a new field" value="Add"/>
                                <button className="styleBtn styleBtn-outline-ok" onClick={apply} title="Change a fields">Apply</button>
                                <input type="button" onClick={delete_field} className="styleBtn styleBtn-outline-danger"
                                 title="Delete a selected field" value="Delete"/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        : 
        !inBlackList
        ?
        <h1 style={{width: '100%', height: '100%', paddingTop: '20%', paddingLeft: '35%'}}>This page is only available to staff</h1>
        :
        <h1 style={{width: '100%', height: '100%', paddingTop: '20%', paddingLeft: '20%'}}>This page is only available to user whose not in black list</h1>}
        </>
    );
}