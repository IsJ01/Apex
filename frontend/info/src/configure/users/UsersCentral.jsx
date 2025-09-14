import { useEffect, useState } from "react";
import "../css/usersCentral.css";
import UsersNote from "./UsersNote";
import CategoriesNote from "./CategoriesNote";
import { getConfigurationText } from "../../getText";
import getLang from "../../getLang";

export default function UsersCentral() {

    const [note, setNote] = useState(<UsersNote/>);

    useEffect(() => {
        updateNote(1);
    }, []);

    const text = getConfigurationText(getLang());

    function updateNote(number) {
        let currentItem;
        let item;
        if (number === 1) {
            setNote(<UsersNote/>);
            currentItem = document.getElementById("users-note-item");
            item = document.getElementById("categories-note-item");
        } else {
            currentItem = document.getElementById("categories-note-item");
            item = document.getElementById("users-note-item");
            setNote(<CategoriesNote/>);
        }
        currentItem.style.border = "1px solid rgb(29, 22, 22)";
        currentItem.style.borderBottom = "none";
        currentItem.style.borderTop = "none";
        item.style.border = "none";
    }

    return (
        <div className="central-content">
            <div className="note-items">
                <div onClick={() => updateNote(1)} className="note-item" 
                    id="users-note-item" style={{gridColumn: 2}}>{text.usersNoteItem}</div>
                <div onClick={() => updateNote(2)} className="note-item" 
                    id="categories-note-item" style={{gridColumn: 4}}>{text.categoriesNoteItem}</div>
            </div>
            <div className="note">
                {note}
            </div>
        </div>
    );
}