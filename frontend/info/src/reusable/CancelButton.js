import { useState } from "react";

export default function CancelButton(props) {
    const [isHover, setIsHover] = useState(false);
    const style = {
        border: '1px solid red',
        width: '25px', 
        height: '25px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: isHover ? 'white' : 'red',
        background: isHover ? 'red' : 'none'
    }
    return (
        <div style={{display: 'flex', justifyContent: 'end', marginBottom: '10px'}} className="cancel_btn_div">
            <button title="Exit" className="cancel_button" onClick={props.func}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={style}>X</button>
        </div>
    );
}
