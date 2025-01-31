import "../css/services.css"
import NewServiceContent from "./NewServiceContent"

import {get_services} from "../../give_objects.js";


function setServiceContent(func) {
    func(<NewServiceContent/>);
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
                    return <div>Name: {service.name} Rows: {service.rows.length}</div>;
                })}
            </div>
        </div>
    );
}