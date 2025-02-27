import axios from "axios";
import InputBar from "./InputBar";
import Message from "./Message";

import "./css/chat.css";
import { messages_api_url } from "../give_objects";
import { get_sessionid } from "../get_cookies";

function send_message(id, of, near) {
    return function () {
        let data = {chatId: id, of: of, near: near, text: document.getElementById("message").value};
        axios.post(`${messages_api_url}/`, data, {headers: {sessionid: get_sessionid()}});
        window.location.reload(true);
    }
}

export default function Chat(props) {
    let messages = props.chat.messages.map(message => {
        if (message.of == props.user.id) {
            return <Message side={"end"} message={message}/>
        } else {
            return <Message side={"start"} message={message}/>
        }
    });
    let near = (props.user.id = props.chat.user1.id) ? props.chat.user2.id : props.chat.user1.id;
    return (
        <>
            <div className="chat">
                {messages}
            </div>
            <InputBar onClick={send_message(props.chat.id, props.user.id, near)}/>
        </>
    );
}