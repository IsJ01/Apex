import { setNormalStyle } from "../../hoverStyle";

export default function CategoryRow(props) {
    
    const normalStyle = {
        color: "rgb(29, 22, 22)",
        borderLeft: "1px solid rgb(29, 22, 22)",
        borderRight: "1px solid rgb(29, 22, 22)",
    }

    return (
        <div onMouseOut={setNormalStyle(normalStyle)} className="user-row" style={normalStyle}>
            {props.category.name}
        </div>
    );
}
