import "./css/new_button.css";

export default function NewButton(props) {
    return (
        <div onClick={props.onClick} title="delete" className="new-button">-</div>
    );
}