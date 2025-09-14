import { useContext, useEffect, useState } from "react";
import getLang from "../../getLang";
import { getConfigurationText } from "../../getText";
import {setHoverStyle} from "../../hoverStyle";
import { users_api_url} from "../../give_objects";
import axios from "axios";
import CategoryRow from "./CategoryRow";
import renderHeader from "../../header/renderHeader";
import { AppContext } from "../../AppProvider";

export default function CategoriesNote() {
    const {user, logout, updateUser, updateTitle} = useContext(AppContext);
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState("");
    const text = getConfigurationText(getLang());

    useEffect(() => {
        renderHeader(Object.keys(user).length !== 0 ? user : updateUser(), logout, updateTitle(), "config");
    }, []);

    useEffect(() => {
        updateCategories();
    }, [page, filter])

    function showNewCategoryDialog() {
        const dialog = document.getElementById("new-category-dialog");
        dialog.showModal();
    }

    const hoverStyle = {
        background: "rgb(29, 22, 22)", 
        color: "white"
    }

    const normalStyle = {
        background: "none", 
        color: "rgb(29, 22, 22)",
        border: "1px solid rgb(29, 22, 22)"
    }

    function addCategory() {
        const newCategoryInput = document.getElementById("new-category-input");
        axios.post(`${users_api_url}/api/v1/categories`, 
            {
                name: newCategoryInput.value
            },
            {
                headers: {
                    "Authorization": localStorage.getItem("Authorization")
                }
            }
        )
        .then(() => {
            document.getElementById("new-category-dialog").close();
            updateCategories();
        });
    }

    function updateCategories() {
        axios.get(encodeURI(`${users_api_url}/api/v1/public/categories?name=${filter}&page=${page}&size=20`), 
        {
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        })
        .then(res => setCategories(res.data.content));

    }

    function toBack() {
        if (page > 0) {
            setPage(page - 1);
        }
    }

    return (
        <div className="users-search" style={{borderBottom: "1px solid rgb(29, 22, 22)"}}>
            <dialog id="new-category-dialog" className="new-category-dialog">
                <div style={{display: "grid", gridTemplateColumns: "auto 10px auto"}}>
                    <label style={{gridColumn: 1}} id="new-category-label">{text.newCategoryLabel}</label>
                    <input style={{gridColumn: 3}} id="new-category-input" className="users-input"/>
                </div>
                <button style={normalStyle}
                    onMouseOver={setHoverStyle(hoverStyle)} 
                    onMouseOut={setHoverStyle(normalStyle)}
                    onClick={addCategory} 
                    className="dialog-button" 
                    id="new-category-button">{text.newCategoryButton}</button>
            </dialog>
            <div className="users-filter" style={{marginLeft: "30%", marginRight: "30%"}}>
                <div className="filter-field">
                    <label>{text.nameFilter}</label>
                    <input onChange={(e) => setFilter(e.target.value)} className="filter-input" 
                        id="categories-input-placeholder" placeholder="..."/>
                </div>
                {/* <div className="action-field" onClick={showNewCategoryDialog}>
                    <div style={{gridColumn: 2}} className="action-label" id="add-new-category-label">{text.addNewCategoryLabel}</div>
                    <div style={{gridColumn: 4}} className="action-button">+</div>
                </div> */}
            </div>
            <div className="users-filters-fields">
                
            </div>
            <div className="users-list" style={{paddingLeft: "30%", paddingRight: "30%"}}>
                <div className="users-list-content">
                    {categories.map(category => <CategoryRow category={category}/>)}
                </div>
                <div className="users-list-arrows">
                    <button style={{gridColumn: 2}} onClick={toBack} className="users-list-arrow">⯇</button>
                    <label style={{gridColumn: 4}} className="users-list-number">{page}</label>
                    <button style={{gridColumn: 6}} onClick={() => setPage(page + 1)} className="users-list-arrow">⯈</button>
                </div>
            </div>
        </div>
    );
}