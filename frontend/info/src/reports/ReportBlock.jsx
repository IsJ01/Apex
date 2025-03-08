import { get_user, reports_api_url } from "../give_objects";
import eye from "../img/Eye.png";
import notEye from "../img/NotEye.png";
import del from "../img/Delete.png";
import axios from "axios";
import { get_sessionid } from "../get_cookies";

function del_report(id) {
    axios.delete(`${reports_api_url}/${id}/`, {
        headers: {
            "sessionid": get_sessionid()
        }
    })
    .then(() => window.location.reload(true));
}

export default function Report(props) {

    const toUser = get_user(props.data.to);

    let file;
    let fileHref
    if (props.data.file) {
        fileHref = `${reports_api_url}/file/${props.data.id}/`;
        file = props.data.file.split("/").at(-1);
    }
    return (
        <div className="report-block" onClick={() => window.location.replace(`/reports/${props.data.id}`)}>
            <>
                {props.of === props.data.of &&
                <div style={{position: "absolute", width: "100%", textAlign: "end", right: "20px"}}>
                    <button style={{border: "none", background: "none"}}
                        onClick={(e) => {del_report(props.data.id); e.stopPropagation()}}>
                        <img width={20} height={20} src={del}/>
                    </button>
                    
                </div>}
            </>
            <div className="report-field" style={{maxHeight: "20px", overflow: "hidden"}}>
                <span className="report-field-title">{props.data.title}</span>
            </div>
            <div className="report-field report-to">
                <span className="report-field-title">To:</span>&nbsp;
                <a className="report-link" href={`/users/${toUser.id}/`}>{toUser.email}</a>&nbsp;
                {
                    props.of === props.data.of
                    &&
                    (
                        props.data.checked
                        ?
                        <img title="checked" width={20} height={20} src={eye} alt="checked"/>
                        :
                        <img title="not checked" width={20} height={20} src={notEye} alt="not checked"/>
                    )
                }
            </div>
            <div className="report-field">
                <span className="report-field-title">Category:</span>&nbsp;
                {props.data.category.name}
            </div>
        </div>
    );
}