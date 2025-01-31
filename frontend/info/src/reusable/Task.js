export default function Task(props) {
    let color;
    if (props["status"] == 'IN_PROGRESS') {
        color = 'rgb(200, 200, 200, 0.5)';
    }
    else if (props["status"] == 'COMPLETE') {
        color = 'rgba(0, 255, 0, 0.5)';
    } 
    else {
        color = 'rgba(255, 0, 0, 0.5)';
    }

    return (
        <div className="task" style={{width: '300px', outline: 'auto', padding: '5px', marginBottom: '10px', background: color}}>
            <div className="task-content" style={{paddingLeft: '5px'}}>
                <p>Near: {props["near"]}</p>
                <p>of: {props["of"]}</p>
                <p>Description: {props["description"]}</p>
                <p>Status: {props["status"]}
                    &nbsp;
                    {
                    props.select
                    &&
                    <>
                        <select value={props.status} onChange={props.select} style={{fontSize: '15px', width: "125px", padding: '0px', borderRadius: '5px'}}>
                        <option>IN_PROGRESS</option>
                        <option>COMPLETE</option>
                        <option>UNCOMPLETE</option>
                        </select>
                    </>
                    }
                </p>
            </div>
        </div>
    );
}