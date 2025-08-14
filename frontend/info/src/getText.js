function getHeaderText(lang) {
    let text;
    switch (lang) {
        case "English (UK)":
            text = {
                confBtn: "Configure",
                homeBtn: "Inbox",
                tasks: "Tasks",
                usersBtn: "Users",
                reportsBtn: "Reports",
                blackBtn: "Black list",
                logoutBtn: "Logout",
                loginBtn: "Login",
                regBtn: "Registry",
                pages: "Pages",

                confBtnTitle: "Configure",
                homeBtnTitle: "Inbox",
                usersBtnTitle: "Users",
                tasksTitle: "Tasks page",
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
                tasks: "Задачи",
                usersBtn: "Пользователи",
                reportsBtn: "Отчеты",
                blackBtn: "Черный список",
                logoutBtn: "Выйти",
                loginBtn: "Войти",
                regBtn: "Регистрация",
                pages: "Страницы",

                confBtnTitle: "Настройки сайта",
                homeBtnTitle: "Домашняя страница",
                tasksTitle: "Страница задач",
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
            break;
    }
    return text;
}

function getLoginText(lang) {
    let text;
    switch (lang) {
        case "English (UK)":
            text = {
                title: "Login",
                username: "Username",
                password: "Password",
                button: "Login",
                error: "User is already log in"
            }
            break;
        case "Русский (Rus)":
            text = {
                title: "Авторизация",
                username: "Имя пользователя",
                password: "Пароль",
                button: "Войти",
                error: "Пользователь уже вошел в систему"
            }
            break;
    }
    return text;
}

function getRegisterText(lang) {
    let text;
    switch (lang) {
        case "English (UK)":
            text = {
                title: "Registration",
                username: "Username",
                number: "Telephone number",
                year: "Year of birth",
                password: "Password",
                repeatedPassword: "Repeated password",
                button: "Register",
                error: "User is already log in"
            }
            break;
        case "Русский (Rus)":
            text = {
                title: "Регистрация",
                username: "Имя пользователя",
                number: "Телефон",
                year: "Год рождения",
                password: "Пароль",
                repeatedPassword: "Повторите пароль",
                button: "Зарегистрироваться",
                error: "Пользователь уже вошел в систему"
            }
    }
    return text;
}

function getInboxText(lang) {
    let text;
    switch (lang) {
        case "English (UK)":
            text = {
                title: "Home",
                description: "Welcome to UCOR - open source software for workflow automation, task management, document approval and business communications.",
                qualification: `If you encounter any <span style="color: rgb(210, 0, 0);">errors</span> or inconveniences while working, 
                        or have any <span style="color: rgb(210, 0, 0);">suggestions</span>, 
                        please write to the developer by email: <a href="mailto:is067isj01@gmail.com">is067isj01@gmail.com</a>`
            }
            break;
        case "Русский (Rus)":
            text = {
                title: "Домашняя страница",
                description: "Добро пожаловать в UCOR — программное обеспечение с открытым исходным кодом для автоматизации рабочих процессов, управления задачами, утверждения документов и бизнес-коммуникаций.",
                qualification: `Если у вас возникли <span style="color: rgb(210, 0, 0);">ошибки</span> или неудобства в работе, 
                        или есть <span style="color: rgb(210, 0, 0);">предложения</span>, 
                        пожалуйста, напишите разработчику на почту: <a href="mailto:is067isj01@gmail.com">is067isj01@gmail.com</a>`
            }
            break;
    }
    return text;
}


export {getHeaderText, getConfigurationText, getUsersText, getLoginText, getRegisterText, getInboxText}
