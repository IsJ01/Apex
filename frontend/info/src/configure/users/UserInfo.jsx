import { useEffect, useState } from "react";
import getLang from "../../getLang";
import CategoryRow from "./CategoryRow";
import { getConfigurationText } from "../../getText";
import {api_url, users_api_url} from "../../give_objects";
import axios from "axios";
import UserCategoriesConfig from "./UserCategoriesConfig";

export default function UserInfo(props) {

    const [page, setPage] = useState(0);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [categories, setCategories] = useState([]);
    const [config, setConfig] = useState(<></>)

    useEffect(() => {
        updateCategories();
    }, [page])

    const normalStyle = {
        border: "1px solid rgb(29, 22, 22)"
    }

    const text = getConfigurationText(getLang());

    function updateCategories() {
        axios.get(api_url, {headers: {
            "Api-Request": encodeURI(`${users_api_url}/api/v1/public/categories?name=&users=${props.user.username}&page=${page}&size=2`)
        }})
        .then(res => setCategories(res.data.content));
    }

    function toBack() {
        if (page > 0) {
            setPage(page - 1);
        }
    }

    function categoryOnClick(e) {
        if (!["users-list-arrow", "category-row"].includes(e.target.className)) {
            setConfig(<UserCategoriesConfig/>)
        }
    }

    return (
        <div className="user-info-content" style={normalStyle}>
            <div className="user-info-list">
                <div className="user-info-row" style={{...normalStyle, gridColumn: 2, gridRow: 3}}>
                    <label style={{gridColumn: 2}} id="user-info-id">{text.userInfoId}</label>
                    <label style={{gridColumn: 4}}>{props.user.id}</label>
                </div>
                <div className="user-info-row" style={{...normalStyle, gridColumn: 2, gridRow: 2}}>
                    <label style={{gridColumn: 2}} id="user-info-number">{text.userInfoNumber}</label>
                    <label style={{gridColumn: 4}}>{props.user.number}</label>
                </div>
                <div className="user-info-row" style={{...normalStyle, gridColumn: "2 / 4", gridRow: 1}}>
                    <label style={{gridColumn: 2}} id="user-info-name">{text.userInfoName}</label>
                    <label style={{gridColumn: 4}}>{props.user.username}</label>
                </div>
                <div className="user-info-row" style={{...normalStyle, gridColumn: 3, gridRow: 3}}>
                    <label style={{gridColumn: 2}} id="user-info-year">{text.userInfoYear}</label>
                    <label style={{gridColumn: 4}}>{props.user.year}</label>
                </div>
                <div className="user-info-row" style={{...normalStyle, gridColumn: 3, gridRow: 2}}>
                    <label style={{gridColumn: 2}} id="user-info-role">{text.userInfoRole}</label>
                    <label style={{gridColumn: 4}}>{props.user.role}</label>
                </div>
                <div onClick={categoryOnClick} className="user-info-categories-row" style={{...normalStyle, 
                    gridColumn: "2 / 4", gridRow: 4}}>
                    <label style={{gridColumn: "1 / 4"}} id="user-info-categories" className="user-info-categories-label">
                        {text.userInfoCategories}
                    </label>
                    {categories.map((category, index) => 
                        <div 
                            style={{textAlign: "center", gridColumn: index + 1, 
                                border: normalStyle.border, background: "rgb(238, 238, 238)"}}>
                                {category.name}
                        </div>)
                    }
                    <div style={{gridRow: 3, gridColumn: "1 / 4"}} className="users-info-list-arrows">
                        <button style={{gridColumn: 2}} onClick={toBack} className="users-list-arrow">⯇</button>
                        <label style={{gridColumn: 4}} className="users-list-number">{page}</label>
                        <button style={{gridColumn: 6}} onClick={() => setPage(page + 1)} className="users-list-arrow">⯈</button>
                    </div>
                </div>
            </div>
            <div className="user-info-config">
                {config}
            </div>
        </div>
    );
}
