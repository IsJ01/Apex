import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { setNormalStyle } from "../../hoverStyle";
import getLang from "../../getLang";
import { getConfigurationText } from "../../getText";
import { users_api_url } from "../../give_objects";
import { AppContext } from "../../AppProvider.jsx";
import UserRow from "./UserRow";
import renderHeader from "../../header/renderHeader.js";

export default function UsersNote() {
    const {user, logout, updateUser, updateTitle} = useContext(AppContext);

    useEffect(() => {
        renderHeader(Object.keys(user).length !== 0 ? user : updateUser(), logout, updateTitle(), "config");
    }, []);

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [year, setYear] = useState("");
    const [role, setRole] = useState("");
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(0);
    const [categoriesPage, setCategoriesPage] = useState(0);
    const [users, setUsers] = useState([]);
    const [categoryfilter, setCategoryFilter] = useState("");

    useEffect(() => {
        updateCategories();
    }, [categoryfilter, categoriesPage])

    useEffect(() => {
        let categoriesList = "&categories=" + categories.join("&categories=")
        axios.get(encodeURI(`${users_api_url}/api/v1/public/users?page=${page}&size=20&username=${name}&year=${year}&telephoneNumber=${number}&role=${role}${categoriesList}`), 
        {
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        })
        .then(res => setUsers(res.data.content))
    }, [name, page, number, year, role]);

    function openCategories(e) {
        const categoriesList = document.getElementById("categories-list");
        if (e.target.innerHTML === "⯈") {
            e.target.innerHTML = "⯆";
            categoriesList.style.display = "block";
        } else {
            e.target.innerHTML = "⯈";
            categoriesList.style.display = "none";
        }
    }

    function updateCategories() {
        axios.get(encodeURI(`${users_api_url}/api/v1/public/categories?name=${categoryfilter}&page=${categoriesPage}&size=3`), 
        {
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        })
        .then(res => {
            const categoriesList = document.getElementById("categories-list-content");
            if (!categoriesList) {
                return;
            }
            categoriesList.innerHTML = "";
            for (let category of res.data.content) {
                const normalStyle = {
                    background: "none", 
                    color: "rgb(29, 22, 22)",
                    borderBottom: "1px solid rgb(29, 22, 22)",
                    gridColumn: 2
                }
                if (categories.includes(category.name)) {
                    normalStyle.color = "rgb(216, 64, 64)";
                } 

                const categoryDiv = document.createElement("div");
                categoryDiv.style.background = normalStyle.background;
                categoryDiv.style.gridColumn = normalStyle.gridColumn;
                categoryDiv.style.borderBottom = normalStyle.borderBottom;

                categoryDiv.className = "category-mini-row";
                categoryDiv.onmouseout = setNormalStyle(normalStyle);
                categoryDiv.onclick = () => {
                    if (categories.includes(category.name)) {
                        setCategories(categories.filter(c => c !== category.name));
                    } else {
                        setCategories(categories.concat(category.name));
                    }
                }

                const categoryLabel = document.createElement("label");
                categoryLabel.style.color = normalStyle.color;
                categoryLabel.textContent = category.name;

                categoryDiv.appendChild(categoryLabel);
                categoriesList.appendChild(categoryDiv);
            }
        });
    }

    function toBack() {
        if (page > 0) {
            setPage(page - 1);
        }
    }
    
    const text = getConfigurationText(getLang());

    return (
        <div className="users-search" style={{borderBottom: "1px solid rgb(29, 22, 22)"}}>
            <div className="users-filter">
                <div className="filter-field">
                    <label>{text.nameFilter}</label>
                    <input onChange={(e) => setName(e.target.value)} className="filter-input" 
                        id="users-input-placeholder" placeholder="..."/>
                </div>
                <div className="filter-field">
                    <label id="number-filter-label" htmlFor="number-filter">{text.numberFilter}</label>
                    <input onChange={(e) => setNumber(e.target.value)}
                        placeholder="..." id="number-filter" className="filter-input"/>
                </div>
                <div className="filter-field">
                    <label id="year-filter-label" htmlFor="year-filter">{text.yearFilter}</label>
                    <input onChange={(e) => setYear(e.target.value)} type="number" 
                        placeholder="..." id="year-filter" className="filter-input"/>
                </div>
                <div className="filter-field">
                    <label id="role-filter-label" htmlFor="role-filter">{text.roleFilter}</label>
                    <select onChange={(e) => setRole(e.target.value)}
                        id="role-filter" className="filter-input">
                        <option>USER</option>
                        <option>EXTERNAL_ADMIN</option>
                        <option>ADMIN</option>
                        <option selected></option>
                    </select>
                </div>
                <div className="filter-field">
                    <label id="categories-filter-label" htmlFor="categories-filter">{text.categoriesFilter}</label>
                    <div id="categories-filter" 
                        className="filter-input categories-input">
                        <div className="categories-input-arrow">
                            <input onChange={(e) => setCategoryFilter(e.target.value)} 
                                className="categories-mini-list-input" placeholder="..."/>
                            <label style={{cursor: "pointer"}} onClick={openCategories}>⯈</label>
                        </div> 
                        <div id="categories-list" className="categories-list">
                            <div id="categories-list-content">
                            </div>
                            <div className="categories-mini-list-arrows">
                                <button onClick={() => categoriesPage > 0 && setCategoriesPage(categoriesPage - 1)} style={{gridColumn: 2}} 
                                    className="categories-mini-list-arrow">⯇</button>
                                <label style={{gridColumn: 4}} className="categories-mini-list-number">{categoriesPage}</label>
                                <button onClick={() => setCategoriesPage(categoriesPage + 1)} style={{gridColumn: 6}} 
                                    className="categories-mini-list-arrow">⯈</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="users-list">
                <div className="users-list-content">
                    {users.map(u => <UserRow sender={user} user={u}/>)}
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