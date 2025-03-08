import { useState } from "react";
import { get_report_categories } from "../give_objects";

function next(ind, max) {
    return (ind + 1) % max;
}

function back(ind, max) {
    if (ind > 0) {
        return ind - 1;
    }
    return max - 1;
}

export default function CategoryFilter(props) {

    const categories = get_report_categories();
    let size = categories.length;
    const [ind, setInd] = useState(0);

    return (
        <div className="category-filter">
            <div className="category-filter-btn" onClick={() => {
                props.setCatFilter(categories[back(ind, size)].name);
                setInd(back(ind, size));
            }}>⯇</div>
            <div>{props.catFilter.charAt(0).toUpperCase() + props.catFilter.slice(1)}</div>
            <div className="category-filter-btn" onClick={() => {
                props.setCatFilter(categories[next(ind, size)].name);
                setInd(next(ind, size));
            }}>⯈</div>
        </div>
    );
}