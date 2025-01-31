import "./css/right_bar.css";

export default function RightBar(props) {
    return (
        <div className="rightBar">
            {props.content}
        </div>
    );
}