import { get_services } from "../../../../give_objects";

export default function getContent(obj) {

    let props = [
        ["method", ["GET", "POST", "PUT", "PATCH", 'DELETE']],
        ["service", get_services().map(ser => ser.name)],
        ["table", ""],
        //["row", "none"]
        ["auto inject data", "", "checkbox"]
    ];
    
    // in development

    return props;
}