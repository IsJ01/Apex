import "../css/page_section.css";

import {get_pages} from "../../give_objects.js";

import NewPagesContent from "./NewPagesContent.jsx";

function setPagesContent(setContent, setRightContent) {
    let lst = document.getElementById("elements-form-list");
    if (lst) {
        lst.innerHTML = "";
    }
    setContent(<NewPagesContent setRightContent={setRightContent}/>);
}

function editPage(setContent, id, setRightContent) {
    let lst = document.getElementById("elements-form-list");
    if (lst) {
        lst.innerHTML = "";
    }
    setContent(<NewPagesContent id={id} setRightContent={setRightContent}/>);
}

export default function PagesSection(props) {

    return (
        <div className="pages-section">
            <div className="pages-section-title">
                <label>Counts: {get_pages().length}</label>
                <div onClick={() => setPagesContent(props.setContent, props.setRightContent)} 
                    title="new page" className="new-page-btn">+</div>
            </div>
            <div className="pages-list">
                {get_pages().map(page => {
                    return (
                        <div>
                            URI: <a href={`/${page.uri}`}>{page.uri}</a> Childrens: {page.childrens.length}
                            <button onClick={() => editPage(props.setContent, page.id, props.setRightContent)}
                            title="Configure" className="config-btn">⚙</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}