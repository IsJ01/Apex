import { useState, useEffect } from "react";
import axios from "axios";
import {black_list_api_url, get_black_list, get_user, get_user_from_email, get_users, users_api_url } from "./give_objects";
import { get_sessionid } from "./get_cookies";
import CancelButton from "./reusable/CancelButton";
import './css/black_list.css';
import Table from "./reusable/Table";


export default function BlackList() {
    const [user, setUser] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [filters, setFilters] = useState({user: '', cause: ''})

    useEffect(() => {
        updateUser();
    }, []);

    function updateUser() {
        let sessionid = get_sessionid();
        axios.get(`${users_api_url}/current/`, 
            {headers: {'sessionid': sessionid}}).then(res => {
            if (res.data.is_authenticated) {
                setUser(res.data);
            }
        });
    }

    function apply() {
        let data = {
            user: get_user_from_email(document.getElementById('black-list-user').value.trim()).id,
            cause: document.getElementById('black-list-cause').value.trim(),
        };
        axios.post(`${black_list_api_url}/`, data, 
            {headers: {sessionid: get_sessionid()}});
        window.location.reload(true);
    }

    function set_black_list_filter() {
        setFilters({
            user: document.getElementById('black-list-f-user').value,
            cause: document.getElementById('black-list-f-cause').value
        });
        document.getElementById('black-list-f-dialog').close();
    }

    function delete_from_black_list() {
        if (selectedUser) {
            axios.delete(`${black_list_api_url}/${selectedUser}/`, {headers: {sessionid: get_sessionid()}});
            window.location.reload(true);
        }
    }

    function get_filter_black_list(black_list) {
        let filter_black_list = [];
        for (let bu of black_list) {
            if (!get_user(bu.user).email.includes(filters.user.trim()) && filters.user) {
                continue;
            }
            if (!bu.cause.includes(filters.cause.trim()) && filters.cause) {
                continue;
            }
            filter_black_list.push(bu);
        }
        return filter_black_list;
    }

    let black_list = get_black_list()
    let black_list_users_id = black_list.map(bu => bu.user);
    let white_users = get_users().filter(u => !black_list_users_id.includes(u.id) && u.id != user.id).filter(u => !u.is_superuser);
    black_list = get_filter_black_list(get_black_list());

    let rows = black_list.map(bu => [   
        {isId: true, text: bu.id, onclick: (e) => {setSelectedUser(e.target.value)}, onblur: (e) => {}},
        {text: get_user(bu.user).email, tag: 'link', href: user.id},
        {text: bu.cause},
    ]);
    return (
        <div className="black-list">
            <dialog id="black-list-f-dialog" className="filter-dialog">
                <CancelButton func={() => {document.getElementById('black-list-f-dialog').close()}}/>
                <form method="dialog" id="filter-form">
                    <p>
                        <label>User:</label>
                        <input id="black-list-f-user"/>
                    </p>
                    <p>
                        <label>Cause:</label>
                        <input id="black-list-f-cause"/>
                    </p>
                </form>
                <div className="dialog-buttons">
                    <button className="styleBtn-outline-normal" title="Apply changes" onClick={set_black_list_filter}>Apply</button>
                    <button className="styleBtn-outline-normal" type="button" 
                    onClick={() => {document.getElementById('black-list-f-dialog').close()}} title="Cancel changes">Cancel</button>
                </div>
            </dialog>
            <dialog id="black-list-dialog" className="filter-dialog">
                <CancelButton func={() => {document.getElementById('black-list-dialog').close()}}/>
                <form method="dialog" id="filter-form">
                    <p>
                        <label>User:</label>
                        <select id="black-list-user">
                            {white_users.map(u => <option>{u.email}</option>)}
                        </select>
                    </p>
                    <p>
                        <label>Cause:</label>
                        <input id="black-list-cause"/>
                    </p>
                </form>
                <div className="dialog-buttons">
                    <button className="styleBtn-outline-normal" title="Apply changes" onClick={apply}>Apply</button>
                    <button className="styleBtn-outline-normal" type="button" 
                    onClick={() => {document.getElementById('black-list-dialog').close()}} title="Cancel changes">Cancel</button>
                </div>
            </dialog>
            <button style={{marginBottom: '5px'}}
                        onClick={() => {document.getElementById('black-list-f-dialog').showModal()}} 
                        className="styleBtn styleBtn-outline-red-2">Filter</button>
            <Table rows={rows} headers={["Id", "Email", "Cause"]}/>
            {user.is_staff && 
                <>
                    <button style={{marginTop: '5px', marginRight: '5px'}} 
                        onClick={() => {document.getElementById('black-list-dialog').showModal()}}
                        className="styleBtn styleBtn-outline-red-2">Add</button>
                    <button style={{marginTop: '5px'}} 
                        onClick={delete_from_black_list}
                        className="styleBtn styleBtn-outline-red-2">Delete</button>
                </>
            }
        </div>
    );
}