import { useState, useEffect } from "react";
import axios from "axios";
import { get_reports, get_user, get_report_category, users_api_url, 
    reports_api_url } from "./give_objects";
import { get_sessionid } from "./get_cookies";
import Report from "./reusable/Report";
import CancelButton from "./reusable/CancelButton";
import './css/reports.css';


export default function Reports() {
    const [user, setUser] = useState({});
    const [filters, setFilters] = useState({title: "", to: "", from: "", category: "", details: "", status: ""});

    useEffect(() => {
        updateUser();
    }, []);

    document.title = "Reports";

    function updateUser() {
        let sessionid = get_sessionid();
        axios.get(`${users_api_url}/current/`, 
            {headers: {'sessionid': sessionid}}).then(res => {
            if (res.data.is_authenticated) {
                setUser(res.data);
            }
        });
    }

    // функция назначения фильтров
    function set_report_filters() {
        let title = "report-title-field";
        let to = "report-to-field";
        let from = "report-from-field";
        let category = "report-category-field";
        let details = "report-details-field";
        let status = "report-status-field";
        const filters = {
            title: document.getElementById(title).value,
            to: document.getElementById(to).value,
            from: document.getElementById(from).value,
            category: document.getElementById(category).value,
            details: document.getElementById(details).value,
            status: document.getElementById(status).value
        }
        setFilters(filters);
        document.getElementById('filter-dialog').close();
    }

    // функция фильрации отчетов
    function filter_reports(reports) {
        let filter_reports = [];
        for (let report of reports) {
            if (!report.title.includes(filters.title.trim()) && filters.title) {
                continue;
            }
            if (!get_user(report.to).email.includes(filters.to.trim()) && filters.to) {
                continue;
            }
            if (!get_user(report.of).email.includes(filters.from.trim()) && filters.from) {
                continue;
            }
            if (!get_report_category(report.category).name.includes(filters.category.trim()) && filters.category) {
                continue;
            }
            if (!report.description.includes(filters.details.trim()) && filters.details) {
                continue;
            }
            if (!report.status.includes(filters.status.trim()) && filters.status) {
                continue;
            }
            filter_reports.push(report);
        }
        return filter_reports;
    }

    // функция сброса фильтров
    function drop_filters() {
        setFilters({title: "", to: "", from: "", category: "", details: "", status: ""});
    }

    // функция изменения статуса отчета
    function new_status(id, status) {
        return function () {
            axios.patch(`${reports_api_url}/${id}/`, {status: status}, {headers: {sessionid: get_sessionid()}})
            window.location.reload(true);
        }
    }

    let reports = get_reports()

    let awaiting_reports = filter_reports(reports).filter(report => report.status == 'Under consideration');
    let accepted_reports = filter_reports(reports).filter(report => report.status == 'accepted');
    let rejected_reports = filter_reports(reports).filter(report => report.status == 'rejected');

    reports = filter_reports(reports).map(report => 
        <div style={{display: "flex", alignItems: "end"}}>
            <Report title={report.title} to={get_user(report.to).email} 
                of={get_user(report.of).email} details={report.description} 
                category={get_report_category(report.category).name} status={report.status}/>
            <div style={{marginBottom: "10px", paddingLeft: "10px"}}>
                <button onClick={new_status(report.id, 'accepted')} className="styleBtn styleBtn-outline-ok">Accept</button>
                <br/>
                <br/>
                <button onClick={new_status(report.id, 'rejected')} className="styleBtn styleBtn-outline-danger">Rejected</button>
            </div>
        </div>
    );

    return (
        <>
            {user.is_staff ? <div className="reports-page">
                <dialog id="filter-dialog" className="filter-dialog">
                    <CancelButton func={() => {document.getElementById('filter-dialog').close()}}/>
                    <form method="dialog" id="filter-form">
                        <p>
                            <label>Title:</label>
                            <input id="report-title-field"/>
                        </p>
                        <p>
                            <label>To:</label>
                            <input id="report-to-field"/>
                        </p>
                        <p>
                            <label>From:</label>
                            <input id="report-from-field"/>
                        </p>
                        <p>
                            <label>Category:</label>
                            <input id="report-category-field"/>
                        </p>
                        <p>
                            <label>Details:</label>
                            <input id="report-details-field"/>
                        </p>
                        <p>
                            <label>Status:</label>
                            <input id="report-status-field"/>
                        </p>
                    </form>
                    <div className="dialog-buttons">
                        <button className="styleBtn-outline-normal" title="Apply changes" onClick={set_report_filters}>Apply</button>
                        <button className="styleBtn-outline-normal" type="button" 
                        onClick={() => {document.getElementById('filter-dialog').close()}} title="Cancel changes">Cancel</button>
                    </div>
                </dialog>
                <div className="reports-sideBar">
                    <p className="report-sideBar-row">Set filters&nbsp;&nbsp;
                        <button onClick={() => document.getElementById('filter-dialog').showModal()} 
                        className="styleBtn styleBtn-outline-red-2">Filter</button>&nbsp;&nbsp;
                        <button onClick={drop_filters} 
                        className="styleBtn styleBtn-outline-red-2">Drop Filters</button>
                    </p>
                    <p className="report-sideBar-row">Awaiting response: {awaiting_reports.length}</p>
                    <p className="report-sideBar-row">Accepted: {accepted_reports.length}</p>
                    <p className="report-sideBar-row">Rejected: {rejected_reports.length}</p>
                    <p className="report-sideBar-row">Total: {reports.length}</p>
                </div>
                <div className="reports">
                    {reports}
                </div>
            </div>
            :
            <h1 style={{width: '100%', height: '100%', paddingTop: '20%', paddingLeft: '35%'}}>This page is only available to staff</h1>}
        </>
    );
}