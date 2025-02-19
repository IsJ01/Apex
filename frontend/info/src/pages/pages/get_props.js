export default function get_props(fields) {
    let req = {};
    let props = {};
    let req_fileds = ["method", "service", "auto inject data", "table"];
    for (let field of fields) {
        if (req_fileds.includes(field.name)) {
            if (field.name === "auto inject data") {
                field.value = Boolean(field.value);
            }
            req[field.name] = field.value;
        } else {
            props[field.name] = field.value;
        }
    }
    return [props, req];
}