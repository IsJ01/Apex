import "./css/new_button.css";

export default function NewButton(props) {
    return (
        <div onClick={props.onClick} title="new-button" className="new-button">+</div>
    );
}