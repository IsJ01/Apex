import { useEffect, useState } from "react";
import CategoryRow from "./CategoryRow";
import { api_url, users_api_url } from "../../give_objects";
import axios from "axios";

export default function UserCategoriesConfig() {

    const [page, setPage] = useState(0);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [categories, setCategories] = useState([]);

    function updateCategories() {
        axios.get(api_url, {headers: {
            "Api-Request": encodeURI(`${users_api_url}/api/v1/public/categories?name=${categoryFilter}&page=${page}&size=4`)
        }})
        .then(res => setCategories(res.data.content));
    }

    useEffect(() => {
        updateCategories();
    }, [page, categoryFilter]);

    const normalStyle = {
        border: "1px solid rgb(29, 22, 22)"
    }

    return (
        <div className="user-category-config">
            <input className="user-category-input" style={normalStyle} placeholder="..."
                onChange={(e) => setCategoryFilter(e.target.value)}/>
            {categories.map(category => <CategoryRow category={category}/>)}
            <div className="users-info-list-arrows">
                <button style={{gridColumn: 2}} onClick={() => {page > 0 && setPage(page - 1)}}
                    className="users-list-arrow">⯇</button>
                <label style={{gridColumn: 4}} className="users-list-number">{page}</label>
                <button style={{gridColumn: 6}} onClick={() => setPage(page + 1)} className="users-list-arrow">⯈</button>
            </div>
        </div>
    );
}