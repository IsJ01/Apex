import getLang from "../getLang";
import { getInboxText, getLoginText, getRegisterText } from "../getText";
import { getMenuBar } from "./menuBar";

function setText(component) {
    const lang = getLang();

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

    if (component === "inbox") {
        let description = document.getElementById("inbox-description");
        let qualification = document.getElementById("inbox-qualification");

        let text = getInboxText(lang);

        description.textContent = text.description;
        qualification.innerHTML = text.qualification

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

    window.addEventListener("resize", () => renderHeader(user, logout, title, component));

}