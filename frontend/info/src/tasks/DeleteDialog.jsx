export default function DeleteDialog(props) {
    return (
        <dialog id={`task-delete-dialog-${props.id}`} className="task-delete-dialog">
            <div>Did you mean delete this task?</div>
            <div className="">
                <button className="styleBtn styleBtn-outline-red" onClick={props.onDelete}>Yes</button>
                <button onClick={(e) => {e.stopPropagation(); console.log(props.id); 
                document.getElementById(`task-delete-dialog-${props.id}`).close();}} 
                    className="styleBtn styleBtn-outline-red">No</button>
            </div>
                
        </dialog>
    );
}