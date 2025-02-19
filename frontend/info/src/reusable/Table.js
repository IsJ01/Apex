export default function Table(props) {

    function onClick(func) {
        return function (event) {
            func(event);
            event.target.style.color = 'red';
        }
    }

    function focusOut(func) {
        return function(event) {
            func(event);
            event.target.style.color = 'black';
        }
    }

    function get_column(col) {
        let element;
        if (col.tag == 'input') {
            element = <input id={col.id} style={{textAlign: "center",
                overflow: "hidden", 
                background: 'none', 
                cursor: "pointer",
                maxWidth: '50px',
                border: 'none',
                height: '24px',
                cursor: 'text'}} defaultValue={col.text}/>;
        }
        else if (col.tag == 'link') {
            element = <a href={col.href} id={col.id} style={{textAlign: "center",
                overflow: "hidden",
                height: '24px',
                color: "rgb(142, 22, 22)",
                textDecoration: 'none'}}>{col.text}</a>;

        }
        else {
            element = col.text;
        }
        return element;
    }

    const red_color = "rgb(216, 64, 64)";

    let rows = props.rows.map(row => 
        <tr>
            {row[0].isId && <td style={{border: `1px solid ${red_color}`, textAlign: "center", 
                        borderRadius: "3px", background: "none", color: red_color}}>
                    <input style={{border: 'none', background: 'none', color: red_color}} type="button"
                     onClick={onClick(row[0].onclick)} value={row[0].text} onBlur={focusOut(row[0].onblur)}/>
                </td>
            }
            {row.slice(1).map(col => 
                    <td style={{border: `1px solid ${red_color}`, textAlign: "center", 
                        borderRadius: "3px", background: "none", color: red_color}}>
                        {get_column(col)}
                    </td>
                )
            }
        </tr>
    );
    return (
        <>
            <table style={{borderCollapse: "separate", border: `1px solid ${red_color}`, 
                minWidth: '300px', borderRadius: "5px", background: "none"}}>
                <thead>
                    <tr>{props.headers.map(col => <th
                        style={{border: `1px solid ${red_color}`, 
                        textAlign: "center", 
                        minWidth: "50px",
                        background: "rgb(0, 0, 0)",
                        borderRadius: "3px",
                        color: red_color
                        }}>
                            {col}
                        </th>)}
                    </tr>
                </thead>
                <tbody id="table-body">
                    {rows}
                </tbody>
            </table>
        </>
    );
}