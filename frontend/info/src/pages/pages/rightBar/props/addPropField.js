export default function addPropField(key, value, id, obj) {
    
    let lst = document.getElementById(id);
    
    let field = document.createElement("div");
    
    let field_label = document.createElement("label");
    field_label.className = "field-label";
    field_label.innerText = `${key}:`;

    let field_input = document.createElement("input");
    field_input.className = "field-input";
    
    let props = JSON.parse(obj.getAttribute("props"));

    if (!props[key]) {
        if (value instanceof Array) {
            props[key] = value[0];
        } else {
            props[key] = value;
        }
    } else {
        if (!(value instanceof Object)) {
            value = props[key];
        } else {
            delete value[value.indexOf(props[key])];
            value = value.filter(v => v !== undefined);
            value = [props[key], ...value];
        }
    }

    obj.setAttribute("props", JSON.stringify(props));

    let func = (e) => {
        let props = JSON.parse(obj.getAttribute("props"));
        props[key] = e.target.value;
        obj.setAttribute("props", JSON.stringify(props));
    };

    field_input.onchange = func;

    if (key.includes("color") || key.includes("background-color")
        || key.includes("border-color")) {
            field_input.type = "color";
            if (key === "background-color") {
                let old_func = field_input.onchange;
                field_input.onchange = (e) => {
                    old_func(e);
                    obj.children[0].children[1].style.borderColor = field_input.value;
                };
            } 
        }
    
    field_input.value = value;

    if (value instanceof Object) {
        field_input = document.createElement("select");

        for (let opt of value) {
            let opt_child = document.createElement("option");
            opt_child.innerText = opt;
            field_input.appendChild(opt_child);
        }
        
        field_input.onchange = func;
        field_input.className = "field-input";
    }

    let delete_button = document.createElement("button");
    delete_button.className = "delete-row-btn";
    delete_button.innerHTML = "-";

    delete_button.onclick = () => {
        let props = JSON.parse(obj.getAttribute("props"));
        delete props[key];
        obj.setAttribute("props", JSON.stringify(props));
        field.remove();
    };

    field.appendChild(field_label);
    field.appendChild(field_input);
    field.appendChild(delete_button);

    lst.appendChild(field);
}