export default function addPropField(key, value, type, id, obj) {

    let lst = document.getElementById(id);
    
    let field = document.createElement("div");
    
    let field_label = document.createElement("label");
    field_label.className = "field-label";
    field_label.innerText = `${key}:`;

    let field_input = document.createElement("input");
    field_input.className = "field-input";

    let req = JSON.parse(obj.getAttribute("req"));

    if (!req[key]) {
        if (value instanceof Array) {
            req[key] = value[0];
        } else {
            req[key] = value;
        }
    } else {
        if (!(value instanceof Object)) {
            value = req[key];
            if (type === 'checkbox') {
                field_input.checked = value;
            }
        } else {
            delete value[value.indexOf(req[key])];
            value = value.filter(v => v !== undefined);
            value = [req[key], ...value];
        }
    }
    obj.setAttribute("req", JSON.stringify(req));
    
    field_input.value = value;

    let func = (e) => {
        let req = JSON.parse(obj.getAttribute("req"));
        req[key] = e.target.value;
        if (type === "checkbox") {
            req[key] = e.target.checked;
        }
        obj.setAttribute("req", JSON.stringify(req));
    };

    field_input.onchange = func;

    if (value instanceof Array) {
        field_input = document.createElement("select");

        for (let opt of value) {
            let opt_child = document.createElement("option");
            opt_child.innerText = opt;
            field_input.appendChild(opt_child);
        }
        field_input.onchange = func;
        field_input.value = value[0];
        field_input.className = "field-input";
    }

    if (type === "checkbox") {
        field_input.type = "checkbox";
    }

    field.appendChild(field_label);
    field.appendChild(field_input);

    lst.appendChild(field);
}