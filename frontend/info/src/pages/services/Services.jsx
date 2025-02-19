import "../css/services.css"
import NewServiceContent from "./NewServiceContent"

import {get_services, services_api_url} from "../../give_objects.js";

function setServiceContent(func) {
    document.getElementById("rightBar").style.display = "none";
    document.getElementById("pages-central").style.width = "80%";
    func(<NewServiceContent/>);
}

function editService(func, id) {
    document.getElementById("rightBar").style.display = "none";
    document.getElementById("pages-central").style.width = "80%";
    func(<NewServiceContent id={id}/>)
}


export default function Services(props) {
    return (
        <div className="services">
            <div className="services-title">
                <label>Counts: {get_services().length}</label>
                <div onClick={() => setServiceContent(props.setContent)} 
                    title="new service" className="new-service-btn">+</div>
            </div>
            <div className="services-list">
                {get_services().map(service => {
                    return <div style={{textAlign: "center"}}>Name:&nbsp;
                        <a style={{textDecoration: "none"}} target="_blank" 
                            href={`${services_api_url}/service/${service.name}/`}>
                            {service.name}
                        </a>
                        <button onClick={() => {editService(props.setContent, service.id)}}
                            title="Configure" className="config-btn">⚙</button>
                    </div>;
                })}
            </div>
        </div>
    );
}