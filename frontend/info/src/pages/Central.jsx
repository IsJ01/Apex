import "./css/central.css";

export default function Central(props) {
    return (
        <div className="pages-central" id="pages-central">
            {props.content}
        </div>
    );
}