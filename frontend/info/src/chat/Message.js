export default function Message(props) {
    let style = {};
    let style2 = {};
    if (props.side == "end") {
        style = {
            marginTop: "10px",
            minHeight: "30px",
            maxWidth: "150px",
            border: '1px solid black',
            borderRadius: "5px 5px 0px 5px",
            wordBreak: "break-all"
        };
        style2 = {
            display: "flex",
            justifyContent: "end"
        }
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
        <div style={style2}>
            <label style={style}>{props.message.text}</label>
        </div>
    );
}
