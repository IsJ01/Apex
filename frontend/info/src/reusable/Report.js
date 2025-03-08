export default function Report(props) {
    return (
        <div className="report">
            <div>{props.title}</div>
            <div>To: {props.to}</div>
            <div>From: {props.of}</div>
            <div>Category: {props.category}</div>
            <div>Details: {props.details}</div>
            <div>Status: {props.status}</div>
        </div>
    );
}