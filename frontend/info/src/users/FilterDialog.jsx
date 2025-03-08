import CancelButton from "../reusable/CancelButton";

// функция закрытия диалога
function close_dialog() {
    document.getElementById('filter-dialog').close();
}

// функция обновления филтров
function filter_(setFilter) {
    let new_filter = {}
    for (let row of document.getElementById('filter-form').children) {
        new_filter[row.children[0].innerText] = row.children[1].value;
    }
    setFilter(new_filter);
    close_dialog();
}

export default function FilterDialog(props) {
    return (
        <dialog id="filter-dialog" className="filter-dialog">
            <CancelButton func={close_dialog}/>
            <form method="dialog" id="filter-form" >
                {props.headers.slice(1).map(head => 
                    <p id={`${head}_row`}>
                        <label htmlFor={head}>{head}</label>
                        <input id={head}/>
                    </p>)
                }
            </form>
            <div className="dialog-buttons">
                <button className="styleBtn-outline-normal" title="Apply changes" 
                onClick={() => filter_(props.setFilter)}>Apply</button>
                <button className="styleBtn-outline-normal" type="button" 
                onClick={close_dialog} title="Cancel changes">Cancel</button>
            </div>
        </dialog>
    );
}