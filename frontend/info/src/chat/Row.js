import "./css/row.css";

export default function Row(props) {

    let image = props.user.image 
    ? 
    props.user.image 
    : 
    "/static/media/User.c111d80991fc4792183f.png";

    return (
        <div onClick={props.onClick} id={props.user.id} className="row">
            <label style={{width: "30px"}}>
                <img className="row-image" width="30" height="30" src={image}/>
            </label>
            <label className="row-username">
                {props.user.username}
            </label>
        </div>
    );
}