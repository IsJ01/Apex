import "./css/input_bar.css";

export default function InputBar(props) {
    return (
        <div className="input-bar">
            <input id="message" type="text" className="textField" placeholder="Write message..."/>
            <button onClick={props.onClick} title="Send" className="send-button">⮞</button>
        </div>
    );
}