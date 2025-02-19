import "./css/right_bar.css";

export default function RightBar(props) {
    return (
        <div id="rightBar" className="rightBar">
            {props.content}
        </div>
    );
}