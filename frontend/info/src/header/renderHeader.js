import getLang from "../getLang";
import { getConfigurationText, getInboxText, getLoginText, getRegisterText } from "../getText";
import { getMenuBar } from "./menuBar";

function setText(component) {
    const lang = getLang();

    if (component === "inbox") {
        let description = document.getElementById("inbox-description");
        let qualification = document.getElementById("inbox-qualification");

        let text = getInboxText(lang);

        description.textContent = text.description;
        qualification.innerHTML = text.qualification

        document.title = text.title;
    }

    if (component === "login") {
        let username = document.getElementById("login-username");
        let password = document.getElementById("login-password");
        let button = document.getElementById("login-button");
        let error = document.getElementById("login-error");

        let text = getLoginText(lang);
        
        if (error) {
            error.textContent = text.error;
        } else {
            username.textContent = text.username;
            password.textContent = text.password;
            button.textContent = text.button;
            button.title = text.title;
        }
        document.title = text.title;
    }

    if (component === "register") {
        let username = document.getElementById("register-username");
        let number = document.getElementById("register-number");
        let year = document.getElementById("register-year");
        let password = document.getElementById("register-password");
        let repeatedPassword = document.getElementById("register-repeated-password");
        let button = document.getElementById("register-button");
        let error = document.getElementById("register-error");

        let text = getRegisterText(lang);

        if (error) {
            error.textContent = text.error;
        } else {
            username.textContent = text.username;
            number.textContent = text.number;
            year.textContent = text.year;
            password.textContent = text.password;
            repeatedPassword.textContent = text.repeatedPassword;
            button.textContent = text.button;
            button.title = text.title;
        }
        document.title = text.title;
    }

    if (component === "config") {
        let users = document.getElementById("config-section-users");
        let reports = document.getElementById("config-section-reports");
        let list = document.getElementById("config-section-list");
        let data = document.getElementById("config-section-data");
        let pages = document.getElementById("config-section-pages");
        let usersNoteItem = document.getElementById("users-note-item");
        let categoriesNoteItem = document.getElementById("categories-note-item");
        let nameFilter = document.getElementById("name-filter");
        let numberFilter = document.getElementById("number-filter-label");
        let yearFilter = document.getElementById("year-filter-label");
        let roleFilter = document.getElementById("role-filter-label");
        let categoriesFilter = document.getElementById("categories-filter-label");
        let addNewCategoryLabel = document.getElementById("add-new-category-label");
        let newCategoryLabel = document.getElementById("new-category-label");
        let newCategoryButton = document.getElementById("new-category-button");
        let userInfoName = document.getElementById("user-info-name");
        let userInfoNumber = document.getElementById("user-info-number");
        let userInfoYear = document.getElementById("user-info-year");
        let userInfoRole = document.getElementById("user-info-role");
        let userInfoCategories = document.getElementById("user-info-categories");
        let error = document.getElementById("config-error");

        let text = getConfigurationText(lang);
        
        if (error) {
            error.textContent = text.error;
        } else {
            users.textContent = text.users;
            reports.textContent = text.reports;
            list.textContent = text.list;
            data.textContent = text.data;
            pages.textContent = text.pages;
            usersNoteItem.textContent = text.usersNoteItem;
            categoriesNoteItem.textContent = text.categoriesNoteItem;
            if (nameFilter) {
                nameFilter.placeholder = text.nameFilter;
                numberFilter.textContent = text.numberFilter;
                yearFilter.textContent = text.yearFilter;
                roleFilter.textContent = text.roleFilter;
                categoriesFilter.textContent = text.categoriesFilter;
            }
            if (addNewCategoryLabel) {
                addNewCategoryLabel.textContent = text.addNewCategoryLabel;
                newCategoryLabel.textContent = text.newCategoryLabel;
                newCategoryButton.textContent = text.newCategoryButton;
            }
            if (userInfoName) {
                userInfoName.textContent = text.userInfoName;
                userInfoNumber.textContent = text.userInfoNumber;
                userInfoYear.textContent = text.userInfoYear;
                userInfoRole.textContent = text.userInfoRole;
                userInfoCategories.textContent = text.userInfoCategories;
            }
        }
        document.title = text.title;
    }

}

function langSelect(user, logout, title, component) {
    return () => {
        const lang = document.getElementById("lang-select").value;
        localStorage.setItem("lang", lang);
        renderHeader(user, logout, title, component);
    
        setText(component);
    }
}

export default function renderHeader(user, logout, title, component=null) {
    let header = document.getElementById("header");
    setText(component);

    if (header) {
        while (header.lastChild) {
            header.removeChild(header.lastChild);
        }
    } else {
        const layout = document.getElementById("layout");
        header = document.createElement("header");
        header.id = "header";
        layout.insertBefore(header, layout.firstChild);
    }
    
    let titleBlock = document.createElement("div");
    let h2 = document.createElement("h2");
    let label = document.createElement("label");
    
    titleBlock.className = "title";
    h2.style.color = "rgb(216, 64, 64)";
    h2.textContent = "UCOR";
    label.style.color = "rgb(216, 64, 64)";
    label.textContent = title;

    titleBlock.appendChild(h2);
    titleBlock.appendChild(label);
    header.appendChild(titleBlock);

    header.appendChild(getMenuBar({user: user, logout: logout, 
        langSelect: langSelect(user, logout, title, component), width: window.innerWidth}));

    // function onResize() {
    //     renderHeader(user, logout, title, component)
    // }

    
    // window.removeEventListener("resize", onResize);
    // window.addEventListener("resize", onResize);

}