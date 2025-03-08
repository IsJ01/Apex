import { useParams } from "react-router-dom";
import { get_report, get_user, users_api_url, reports_api_url } from "../give_objects";

import eye from "../img/Eye.png";
import notEye from "../img/NotEye.png";
import { useEffect, useState } from "react";
import { get_sessionid } from "../get_cookies";
import axios from "axios";
import Chart from "./ReportChart";

export default function Report(props) {

    const [user, setUser] = useState({});

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

    const { id } = useParams();

    let report = get_report(id);

    if (!report.to) {
        return (
            <div>
                 <h1 style={{width: '100%', height: '100%', paddingTop: '20%', paddingLeft: '35%'}}>
                    This page is only available to users
                </h1>
            </div>
        );
    }

    if (user.id === report.to) {
        axios.patch(`${reports_api_url}/${report.id}/`, {
            checked: true
        },
        {
            headers: {
                "sessionid": get_sessionid()
            }
        });
    }

    const toUser = get_user(report.to);
    
    const date = report.pub_date;

    let file;
    let fileHref
    if (report.file) {
        fileHref = `${reports_api_url}/file/${report.id}/`;
        file = report.file.split("/").at(-1);
    }

    let chart;
    if (report.chart) {
        chart = <Chart data={report.chart}/>;
    }
    
    return (
        <div className="report-cont">
            <div className="report-info">
                <div style={{textAlign: "center"}}>
                    <h3 className="report-field-title">{report.title}</h3>
                </div>
                <div className="report-field report-description">{report.description}</div>
                <div className="report-field">
                    <span className="report-field-title">To:</span>&nbsp;
                    <a className="report-link" href={`/users/${toUser.id}/`}>{toUser.email}</a>&nbsp;
                    <>
                        {
                            user.id === report.of
                            &&
                            (
                                report.checked
                                ?
                                <img title="checked" width={20} height={20} src={eye} alt="checked"/>
                                :
                                <img title="not checked" width={20} height={20} src={notEye} alt="not checked"/>
                            )
                        }   
                    </>
                </div>
                <div className="report-field">
                    <span className="report-field-title">Category:</span>&nbsp;
                    {report.category.name}
                </div>
                <div className="report-field">
                    <span className="report-field-title">File:</span>
                    &nbsp;
                    <>{
                        file
                        ?
                        <a href={fileHref} className="report-link">{file}</a>
                        :
                        "Not"
                    }</>
                </div>
                <div className="report-field">
                    <span className="report-field-title">Date:</span>&nbsp;
                    {date}
                </div>
            </div>  
            <div className="report-chart">
                {chart}
            </div>  
        </div>
    );
}