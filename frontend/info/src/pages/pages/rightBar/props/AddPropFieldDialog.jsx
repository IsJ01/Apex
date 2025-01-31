import CancelButton from "../../../../reusable/CancelButton";
import addPropField from "./addPropField";

function addField(obj) {

    let name = document.getElementById("new-prop-name").value;
    
    if (!name) {
        alert("Invalid name!");
        return
    }

    addPropField(name, "", "right-bar-content", obj);
    document.getElementById("add-prop-field-dialog").close();
}

export default function AddPropFieldDialog(props) {
    return (
        <dialog id="add-prop-field-dialog">
            <CancelButton func={() => document.getElementById("add-prop-field-dialog").close()}/>
            <div>
                <label style={{width: "100px"}}>Name:</label>
                <input id="new-prop-name" style={{width: "100px"}}/>
            </div>
            <div>
                <button style={{marginTop: "20px"}} onClick={() => addField(props.obj)} 
                className="styleBtn styleBtn-outline-ok">Add</button>
            </div>
        </dialog>
    );
}