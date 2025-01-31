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
                textDecoration: 'none'}}>{col.text}</a>;

        }
        else {
            element = col.text;
        }
        return element;
    }

    let rows = props.rows.map(row => 
        <tr>
            {row[0].isId && <td style={{border: "1px solid black", textAlign: "center", 
                        borderRadius: "3px"}}>
                    <input style={{border: 'none', background: 'none'}} type="button"
                     onClick={onClick(row[0].onclick)} value={row[0].text} onBlur={focusOut(row[0].onblur)}/>
                </td>
            }
            {row.slice(1).map(col => 
                    <td style={{border: "1px solid black", textAlign: "center", 
                        borderRadius: "3px"}}>
                        {get_column(col)}
                    </td>
                )
            }
        </tr>
    );
    return (
        <>
            <table style={{borderCollapse: "separate", border: "1px solid black", minWidth: '300px', borderRadius: "5px"}}>
                <thead>
                    <tr>{props.headers.map(col => <th
                        style={{border: "1px solid black", 
                        textAlign: "center", 
                        minWidth: "50px",
                        background: "rgb(210, 210, 210)",
                        borderRadius: "3px"
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