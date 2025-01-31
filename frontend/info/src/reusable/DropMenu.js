import "../css/drop_menu.css";

export default function DropMenu(props) {
    let struct = [];

    let parent_className = props.className ? props.className : "drop-menu";
    let default_row_className = "drop-menu-row";

    for (let menu of props.struct) {
        let className = menu.className ? menu.className : default_row_className;
        let row = 
        (
            <div className={className} onClick={menu.onClick} title={menu.title}>
                {menu.innerText}
            </div>
        )
        struct.push(row);
    }
    return (
        <div id={props.id} className={parent_className}>
            {struct}
        </div>
    );
}