import axios from "axios";
import CancelButton from "../reusable/CancelButton";
import Row from "./Row";

import "./css/add_chat_dialog.css";
import { chats_api_url } from "../give_objects";
import { get_sessionid } from "../get_cookies";

function add_chat(u) {
    return function(e) {
        let id;
        if (e.target.className == "row") {
            id = e.target.id;
        } else {
            id = e.target.parentNode.id;
        }
        let data = {user1: u.id, user2: parseInt(id)};
        axios.post(`${chats_api_url}/`, data, {headers: {sessionid: get_sessionid()}});
        document.getElementById("add-chat-dialog").close()
        window.location.reload(true);
    }

}
    
export default function AddChatDialog(props) {
    let users = props.users.map(
        user => <Row onClick={add_chat(props.user)} user={user}/>
    );
    return (
        <dialog className="add-chat-dialog" id="add-chat-dialog">
            <CancelButton func={() => {document.getElementById("add-chat-dialog").close()}}/>
            {users}
        </dialog>
    );
}