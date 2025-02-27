export default function Report(props) {
    let color;
    if (props.status === 'Under consideration') {
        color = 'rgb(200, 200, 200, 0.5)';
    }
    else if (props.status === 'accepted') {
        color = 'rgba(0, 255, 0, 0.5)';
    } 
    else {
        color = 'rgba(255, 0, 0, 0.5)';
    }
    return (
        <div className="report" style={{width: '300px', outline: 'auto', padding: '5px', marginBottom: '10px', background: color}}>
            {props.title && <p style={{textAlign: 'center'}}>{props.title}</p>}
            <div className="report-content" style={{paddingLeft: '5px'}}>
                {props.to && <p>To: {props.to}</p>}
                {props.of && <p>From: {props.of}</p>}
                <p>Category: {props.category}</p>
                {props.details && <p>Details: {props.details}</p>}
                <p>Status: {props.status}</p>
            </div>
        </div>
    );
}