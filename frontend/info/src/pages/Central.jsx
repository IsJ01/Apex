import "./css/central.css";

// центральный компонент
export default function Central(props) {
    return (
        <div className="pages-central" id="pages-central">
            {props.content}
        </div>
    );
}