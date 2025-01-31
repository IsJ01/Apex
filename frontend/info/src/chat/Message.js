export default function Message(props) {
    let style = {};
    if (props.side == "end") {
        style = {
            marginLeft: "715px",
            marginTop: "10px",
            minHeight: "30px",
            maxWidth: "150px",
            border: '1px solid black',
            borderRadius: "5px 5px 0px 5px",
            wordBreak: "break-all"
        };
    } else {
        style = {
            marginLeft: "15px",
            marginTop: "10px",
            minHeight: "30px",
            maxWidth: "150px",
            border: '1px solid black',
            borderRadius: "5px 5px 5px 0px",
            wordBreak: "break-all"
        };
    }
    return (
        <div style={style}>{props.message.text}</div>
    );
}
