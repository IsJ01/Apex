import axios from "axios";
import { users_api_url } from "../../give_objects";
import { useEffect, useState } from "react";
import { setNormalStyle } from "../../hoverStyle";

export default function UserRow(props) {
    const [page, setPage] = useState(0);
    const [addPage, setAddPage] = useState(0);

    const normalStyle = {
        color: "rgb(29, 22, 22)",
        borderLeft: "1px solid rgb(29, 22, 22)",
        borderRight: "1px solid rgb(29, 22, 22)",
    };

    useEffect(() => {
        updateCategories();
    }, [page]);

    useEffect(() => {
        updateNewCategories();
    }, [addPage]);

    function updateCategories() {
        axios.get(encodeURI(`${users_api_url}/api/v1/public/categories?users=${props.user.username}&page=${page}&size=3`), 
        {
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        })
        .then(res => {
            const categoriesList = document.getElementById(`user-info-categories-list-${props.user.id}`);
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

                const categoryDiv = document.createElement("div");
                categoryDiv.style.background = normalStyle.background;
                categoryDiv.style.gridColumn = normalStyle.gridColumn;
                categoryDiv.style.borderBottom = normalStyle.borderBottom;

                categoryDiv.className = "category-mini-row";
                categoryDiv.onmouseout = setNormalStyle(normalStyle);
                categoryDiv.onclick = () => {
                axios.delete(encodeURI(`${users_api_url}/api/v1/users/${props.user.id}/categories?name=${category.name}`), {
                        headers: {
                            "Authorization": localStorage.getItem("Authorization")
                        }
                    })
                    .then(() => {
                        updateCategories();
                        updateNewCategories();
                    })
                    .catch((e) => alert(e.message));
                }

                const categoryLabel = document.createElement("label");
                categoryLabel.style.color = normalStyle.color;
                categoryLabel.textContent = category.name;

                categoryDiv.appendChild(categoryLabel);
                categoriesList.appendChild(categoryDiv);
            }
        });
    }

    function updateNewCategories() {
        axios.get(encodeURI(`${users_api_url}/api/v1/public/categories/by-has-not-users?users=${props.user.username}&page=${addPage}&size=3`), 
        {
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        })
        .then(res => {
            const categoriesList = document.getElementById(`user-info-add-categories-list-${props.user.id}`);
            if (!categoriesList) {
                return;
            }
            categoriesList.innerHTML = "";
            for (let category of res.data.content) {
                const normalStyle = {
                    color: "rgb(29, 22, 22)",
                    borderBottom: "1px solid rgb(29, 22, 22)",
                    gridColumn: 2
                }

                const categoryDiv = document.createElement("div");
                categoryDiv.style.background = normalStyle.background;
                categoryDiv.style.gridColumn = normalStyle.gridColumn;
                categoryDiv.style.borderBottom = normalStyle.borderBottom;

                categoryDiv.className = "category-mini-row";
                categoryDiv.onmouseout = setNormalStyle(normalStyle);

                const categoryLabel = document.createElement("label");
                categoryLabel.style.color = normalStyle.color;
                categoryLabel.textContent = category.name;
                    
                categoryDiv.onclick = () => {
                    axios.patch(`${users_api_url}/api/v1/users/${props.user.id}/categories`, {name: category.name}, {
                        headers: {
                            "Authorization": localStorage.getItem("Authorization")
                        }
                    })
                    .then(() => {
                        updateCategories();
                        updateNewCategories();
                    })
                    .catch((e) => alert(e.message));
                }

                categoryDiv.appendChild(categoryLabel);
                categoriesList.appendChild(categoryDiv);
            }
        });
    }

    function updateUser() {
        let number = document.getElementById(`user-info-number-${props.user.id}`).textContent;
        let year = document.getElementById(`user-info-year-${props.user.id}`).textContent;
        let body = {};
        if (number !== "?????") {
            body.telephoneNumber = number;
        }
        if (year !== "?????") {
            body.year = year;
        }
        axios.patch(`${users_api_url}/api/v1/users/${props.user.id}`, body, {
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        })
        .catch((e) => alert(e.message))
    }

    function updateRole() {
        let role = document.getElementById(`user-info-role-${props.user.id}`).textContent;
        let body = {role: role};
        axios.patch(`${users_api_url}/api/v1/users/${props.user.id}`, body, {
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        })
        .catch((e) => alert(e.message))
    }

    function onFocusOut(element) {
        const value = element.children[0].value;
        element.children[0].remove();
        element.textContent = value;
        updateUser();
    }

    function onFocusOutRole(element) {
        const value = element.children[0].value;
        element.children[0].remove();
        element.textContent = value;
        updateRole();
    }

    function onClick(e) {
        if (e.target.tagName !== "LABEL" || (props.user.role === "ADMIN" && props.sender.role !== "ADMIN")) {
            return;
        }
        const inp = document.createElement("input");
        inp.onblur = () => onFocusOut(e.target);
        inp.style.height = "23px";
        inp.style.background = "none";
        inp.style.outline = "none";
        inp.style.border = "0px";
        inp.style.borderBottom = "1px solid black";

        if (e.target.innerText !== "?????") {
            inp.value = e.target.innerText;
        }

        e.target.innerText = "";
        e.target.appendChild(inp);

    }

    function onClickRole(e) {
        if (e.target.tagName !== "LABEL" || (props.sender.role !== "ADMIN" && props.sender.username !== props.user.username)) {
            return;
        }
        const select = document.createElement("select");

        const option1 = document.createElement("option");
        option1.text = "USER";
        select.appendChild(option1);

        const option2 = document.createElement("option");
        option2.text = "EXTERNAL_ADMIN";
        select.appendChild(option2);

        const option3 = document.createElement("option");
        option3.text = "ADMIN";
        select.appendChild(option3);
        
        select.onselect = () => onFocusOutRole(e.target);
        select.onblur = () => onFocusOutRole(e.target);
        select.style.height = "23px";
        select.style.background = "none";
        select.style.outline = "none";
        select.style.border = "0px";
        select.style.borderBottom = "1px solid black";

        if (e.target.innerText !== "?????") {
            select.value = e.target.innerText;
        }

        e.target.innerText = "";
        e.target.appendChild(select);

    }

    function openCategories() {
        const list = document.getElementById(`user-info-categories-dialog-${props.user.id}`);
        list.showModal();
    }

    return (
        <div className="user-row" style={normalStyle}>
            <dialog style={{width: 490, border: "1px solid gray", outline: "none"}} id={`user-info-categories-dialog-${props.user.id}`}>
                <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div style={{border: "1px solid gray"}}>
                        <div id={`user-info-categories-list-${props.user.id}`}>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-around"}}>
                            <button onClick={() => page > 0 && setPage(page - 1)} 
                                style={{gridColumn: 2, width: "75px", outline: "none", userSelect: "none"}} className="categories-mini-list-arrow">⯇</button>
                            <label style={{gridColumn: 4, width: "30px"}} className="categories-mini-list-number">{page}</label>
                            <button onClick={() => setPage(page + 1)} 
                                style={{gridColumn: 6, width: "75px", outline: "none", userSelect: "none"}} className="categories-mini-list-arrow">⯈</button>
                        </div>
                    </div>
                    <div style={{display: "flex", height: "60px", flexDirection: "column"}}>
                        <button className="styleBtn styleBtn-outline-red" 
                            tyle={{marginTop: "10px", height: "30px"}}>⯈</button>
                        <button className="styleBtn styleBtn-outline-red" 
                            tyle={{marginTop: "10px", height: "30px"}}>⯇</button>
                    </div>
                    <div style={{border: "1px solid gray"}}>
                        <div id={`user-info-add-categories-list-${props.user.id}`}>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-around"}}>
                            <button onClick={() => addPage > 0 && setAddPage(addPage - 1)} 
                                style={{gridColumn: 2, width: "75px", outline: "none", userSelect: "none"}} className="categories-mini-list-arrow">⯇</button>
                            <label style={{gridColumn: 4, width: "30px"}} className="categories-mini-list-number">{addPage}</label>
                            <button onClick={() => setAddPage(addPage + 1)} 
                                style={{gridColumn: 6, width: "75px", outline: "none", userSelect: "none"}} className="categories-mini-list-arrow">⯈</button>
                        </div>
                    </div> 
                </div>         
            </dialog>
            <label>{props.user.username}</label>
            <label id={`user-info-number-${props.user.id}`} onClick={onClick}>
                {props.user.telephoneNumber ? props.user.telephoneNumber : "?????"}
            </label>
            <label id={`user-info-year-${props.user.id}`} onClick={onClick}>{props.user.year ? props.user.year : "?????"}</label>
            <label id={`user-info-role-${props.user.id}`} onClick={onClickRole}>{props.user.role}</label>
            <label onClick={openCategories} id={`user-info-categories-${props.user.id}`}>
                <span id={`user-info-categories-arrow-${props.user.id}`}>⯈</span>
            </label>
        </div>
    );
}
