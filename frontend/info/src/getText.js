function getHeaderText(lang) {
    let text;
    switch (lang) {
        case "English (UK)":
            text = {
                confBtn: "Configure",
                homeBtn: "Inbox",
                usersBtn: "Users",
                reportsBtn: "Reports",
                blackBtn: "Black list",
                logoutBtn: "Logout",
                loginBtn: "Login",
                regBtn: "Registry",
                pages: "Pages",

                confBtnTitle: "Configure",
                homeBtnTitle: "Home",
                usersBtnTitle: "Users",
                reportsBtnTitle: "Reports",
                blackBtnTitle: "Black list of users",
                logoutBtnTitle: "Logout",
                loginBtnTitle: "Login",
                regBtnTitle: "Registry",
                profileTitle: "Your page",
                pagesTitle: "Pages"
            };
            break;
        case "Русский (Rus)":
            text = {
                confBtn: "Настройки",
                homeBtn: "Входящие",
                usersBtn: "Пользователи",
                reportsBtn: "Отчеты",
                blackBtn: "Черный список",
                logoutBtn: "Выйти",
                loginBtn: "Войти",
                regBtn: "Регистрация",
                pages: "Страницы",

                confBtnTitle: "Настройки сайта",
                homeBtnTitle: "Домашняя страница",
                usersBtnTitle: "список пользователей",
                reportsBtnTitle: "Список отчетов",
                blackBtnTitle: "Черный список пользователей",
                logoutBtnTitle: "Выйти",
                loginBtnTitle: "Войти",
                regBtnTitle: "Регистрация",
                profileTitle: "Ваша страница",
                pagesTitle: "Страницы"
            }
            break;    
        }
    return text;
}

function getConfigurationText(lang) {
    let text;
    switch (lang) {
        case "English (UK)":
            text = {
                listTitle: "Dates",
                orgTitle: "Organization",
                uCat: "User categories",
                rCat: "Reports categories",
                staffTitle: "Staff",
            };
            break;
        case "Русский (Rus)":
            text = {
                listTitle: "Данные",
                orgTitle: "Организация",
                uCat: "Категории пользователей",
                rCat: "Категории отчетов",
                staffTitle: "Персонал",
            };
    }
    return text;
}

function getUsersText(lang) {
    let text;
    switch (lang) {
        case "English (UK)":
            text = {
                filterBtn: "Filter",
                applyBtn: "Apply",
            };
            break;
        case "Русский (Rus)":
            text = {
                filterBtn: "Фильтры",
                applyBtn: "Применить",
            };
    }
    return text;
}


export {getHeaderText, getConfigurationText, getUsersText}
