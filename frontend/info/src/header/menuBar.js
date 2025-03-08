export function getMenuBar(props) {
    if (props.width >= 1024) {
        return writeFullMenu(props);
    } else {
        return writeDropMenu(props)
    }
        
}

function getLangBox(langs, lang, func) {
    let select = document.createElement("select");
    select.className = "select-lang";

    select.id = "lang-select";
    select.value = lang;
    select.onChange = func;

    for (let lang of langs) {
        let option = document.createElement("option");
        option.innerHTML = lang;
        select.appendChild(option);
    }
    return select;
}

function getBtnElement(href, text, title) {
    let a = document.createElement("a");
    a.className = "option styleBtn styleBtn-outline-red";
    a.href = href;
    a.innerText = text;
    a.title = title;
    return a;
}

function writeFullMenu(props) {
    let user = props.user;
    let text = props.text;

    let menuBar = document.createElement("div");
    menuBar.className = "menuBar";
    menuBar.id = "menuBar";

    let options = document.createElement("p");
    options.className = "options";

    options.appendChild(getLangBox(["English (UK)", "Русский (Rus)"], props.lang, props.onSelectLang));
    menuBar.appendChild(options);

    if (user.is_superuser || user.is_staff) {
        options.appendChild(getBtnElement("/configure/", text.confBtnTitle, text.confBtn));
    }

    for (let btn of [
        // ["/", text.homeBtn, text.homeBtnTitle], 
        ["/pages/", text.pages, text.pagesTitle], 
        ["/tasks/", text.tasks, text.tasksTitle], ["/users/", text.usersBtn, text.usersBtnTitle]]) {
            options.appendChild(getBtnElement(btn[0], btn[1], btn[2]));
    }

    if (user.is_authenticated) {
        options.appendChild(getBtnElement("/reports/", text.reportsBtn, text.reportsBtnTitle));
        options.appendChild(getBtnElement("/blackList/",  text.blackBtn, text.blackBtnTitle));
    }

    let p = document.createElement("p");
    p.className = "login_or_logout";

    if (user.is_authenticated) {
        let userLabel = getBtnElement(`/users/${user.id}`, user.username, text.profileTitle);
        userLabel.className = "user_label";
        userLabel.style.color = "rgb(238, 238, 238)";

        let logoutBtn = document.createElement("button");
        logoutBtn.className = "user_btn styleBtn styleBtn-outline-red";
        logoutBtn.onclick = props.logout;
        logoutBtn.title = text.logoutBtnTitle;
        logoutBtn.innerText = text.logoutBtn;

        p.appendChild(userLabel);
        p.appendChild(logoutBtn);
    } else {
        let loginBtn = getBtnElement("/login/", text.loginBtn, text.loginBtnTitle);
        loginBtn.className = "user_btn styleBtn styleBtn-outline-red";

        let regBtn = getBtnElement("/register/", text.regBtn, text.regBtnTitle);
        regBtn.className = "user_btn styleBtn styleBtn-outline-red";

        p.appendChild(loginBtn);
        p.appendChild(regBtn);
    }
    
    menuBar.appendChild(p);
    return menuBar;
}

function getDropMenuEl(href, text, title) {
    let el = document.createElement("div");
    let link = document.createElement("a");
    link.className = "drop-menu-el";
    link.innerText = text;
    link.href = href;
    link.title = title;

    el.appendChild(link);
    return el;
}

function dropBtnClicked() {
    let cont = document.getElementById("drop-menu-cont");
    if (cont.style.display === "none") {
        cont.style.display = "block";
    } else {
        cont.style.display = "none";
    }
}

function writeDropMenu(props) {
    let user = props.user;
    let text = props.text;

    let menuBar = document.createElement("div");
    menuBar.id = "menuBar";

    let p = document.createElement("p");
    p.className = "login_or_logout";

    let dropBtn = document.createElement("button");
    dropBtn.className = "drop_btn";
    dropBtn.onclick = dropBtnClicked;

    let dropMenu = document.createElement("div");
    dropMenu.appendChild(dropBtn);

    let droptMenuCont = document.createElement("div");
    droptMenuCont.id = "drop-menu-cont";
    droptMenuCont.style.display = "none";
    droptMenuCont.className = "drop-menu-cont";

    if (user.is_superuser || user.is_staff) {
        droptMenuCont.appendChild(getDropMenuEl("/configure/", text.confBtnTitle, text.confBtn));
    }

    let els = [
        // ["/", text.homeBtn, text.homeBtnTitle], 
        ["/pages/", text.pages, text.pagesTitle], 
        ["/tasks/", text.tasks, text.tasksTitle], ["/users/", text.usersBtn, text.usersBtnTitle]];

    if (props.width < 375) {
        els.push([`/users/${user.id}`, user.username, text.profileTitle]);
    }

    if (user.is_authenticated) {
        if (props.width >= 375) {
            let userLabel = getBtnElement(`/users/${user.id}`, user.username, text.profileTitle);
            userLabel.className = "user_label";
            userLabel.style.color = "rgb(238, 238, 238)";
            p.appendChild(userLabel);
        }

        els.push(["/reports/", text.reportsBtn, text.reportsBtnTitle]);
        els.push(["/blackList/",  text.blackBtn, text.blackBtnTitle]);
        let logoutBtn = document.createElement("button");
        logoutBtn.className = "user_btn styleBtn styleBtn-outline-red";
        logoutBtn.onclick = props.logout;
        logoutBtn.title = text.logoutBtnTitle;
        logoutBtn.innerText = text.logoutBtn;
        p.appendChild(logoutBtn);

    } else if (!user.is_authenticated) {
        if (props.width >= 375) {
            let loginBtn = getBtnElement("/login/", text.loginBtn, text.loginBtnTitle);
            loginBtn.className = "user_btn styleBtn styleBtn-outline-red";
            let regBtn = getBtnElement("/register/", text.regBtn, text.regBtnTitle);
            regBtn.className = "user_btn styleBtn styleBtn-outline-red";
            p.appendChild(loginBtn);
            p.appendChild(regBtn);
        } else {
            els.push(["/login/", text.loginBtn, text.loginBtnTitle]);
            els.push(["/register/", text.regBtn, text.regBtnTitle]);
        }

    }

    for (let btn of els) {
        droptMenuCont.appendChild(getDropMenuEl(btn[0], btn[1], btn[2]));
    }

    dropMenu.appendChild(droptMenuCont);


    let menuBarCont = document.createElement("div");
    menuBar.className = "menu-bar";


    menuBar.appendChild(getLangBox(["English (UK)", "Русский (Rus)"], props.lang, props.onSelectLang))
    menuBar.appendChild(dropMenu);
    menuBarCont.appendChild(p);
    menuBar.appendChild(menuBarCont)

    return menuBar;
}
