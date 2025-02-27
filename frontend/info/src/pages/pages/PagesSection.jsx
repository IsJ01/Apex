import "../css/page_section.css";

import {get_pages} from "../../give_objects.js";

import NewPagesContent from "./NewPagesContent.jsx";

function setPagesContent(setContent, setRightContent) {
    document.getElementById("rightBar").style.display = "block";
    document.getElementById("pages-central").style.width = "60%";
    // очищение списка элементов
    let lst = document.getElementById("elements-form-list");
    if (lst) {
        lst.innerHTML = "";
    }
    setContent(<NewPagesContent setRightContent={setRightContent}/>);
}

// функция отвечает за заполнение центрального окна для изменения страницы
function editPage(setContent, id, setRightContent) {
    document.getElementById("rightBar").style.display = "block";
    document.getElementById("pages-central").style.width = "60%";
    let lst = document.getElementById("elements-form-list");
    if (lst) {
        lst.innerHTML = "";
    }
    setContent(<NewPagesContent id={id} setRightContent={setRightContent}/>);
}

// секция страниц
export default function PagesSection(props) {

    return (
        <div className="pages-section">
            <div className="pages-section-title">
                <label>Counts: {get_pages().length}</label>
                {/* Данная кнопка меняет центральное окно для создания новой страницы */}
                <div onClick={() => setPagesContent(props.setContent, props.setRightContent)} 
                    title="new page" className="new-page-btn">+</div>
            </div>
            <div className="pages-list">
                {get_pages().map(page => {
                    return (
                        <div style={{display: "flex", justifyContent: "space-between"}}>
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