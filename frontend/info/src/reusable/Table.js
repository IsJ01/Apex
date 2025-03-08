import "./css/table.css";

export default function Table(props) {

    const red_color = "rgb(216, 64, 64)";

    function onClick(func) {
        return function (event) {
            func(event);
            event.target.style.color = 'rgb(142, 22, 22)';
        }
    }

    function focusOut(func) {
        return function(event) {
            func(event);
            event.target.style.color = red_color;
        }
    }

    function get_column(col) {
        let element;
        if (col.tag == 'input') {
            element = <input className="table-input" id={col.id} defaultValue={col.text}/>;
        }
        else if (col.tag == 'link') {
            element = <a className="table-link" href={col.href} id={col.id}>{col.text}</a>;
        }
        else {
            element = col.text;
        }
        return element;
    }

    let rows = props.rows.map(row => 
        <tr className="table-row">
            {row[0].isId && 
                <td className="table-ceil">
                    <input className="table-input-btn" type="button"
                        onClick={onClick(row[0].onclick)} 
                        value={row[0].text} 
                        onBlur={focusOut(row[0].onblur)}/>
                </td>
            }
            {row.slice(1).map(col => 
                    <td className="table-ceil">
                        {get_column(col)}
                    </td>
                )
            }
        </tr>
    );
    return (
        <>
            <table className="rtable">
                <thead>
                    <tr>{props.headers.map(col => <th className="table-header">{col}</th>)}
                    </tr>
                </thead>
                <tbody id="table-body">
                    {rows}
                </tbody>
            </table> 
    </>
    );
}