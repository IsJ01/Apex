import React, { useState } from "react";


export default function Cell(props) {

    let input;
    if (props.col.id[0] != '?') {
        input = (
            <input onBlur={props.focusOut} className={`fields-input`} type="text" 
                id={props.col.id} value={props.col.text}
                style={{textAlign: "center", maxWidth: props.COLUMN_WIDTH, overflow: "hidden"}}
            />
        );
    } else {
        input = (
            <input onBlur={props.focusOut} className={`fields-input`} type="text" 
                id={props.col.id}
                style={{textAlign: "center", maxWidth: props.COLUMN_WIDTH, overflow: "hidden"}}
            />
        );
    }

    return (
        <td className={`table-col`} style={{textAlign: "center", minWidth: props.COLUMN_WIDTH, overflow: "hidden"}}>
            {props.col.tag == "input" ? 
            input
            : props.col.text}
        </td>
    );
}