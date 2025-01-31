function getHeaderText(lang) {
    let text;
    switch (lang) {
        case "English (UK)":
            text = {
                confBtn: "Configure ⚙",
                homeBtn: "Home",
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
                confBtn: "Настройки ⚙",
                homeBtn: "Начало",
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

function getHomeText(lang) {
    let text;
    switch (lang) {
        case "English (UK)":
            text =  (
                <p className="description">
                    Welcome to reports site, user. On this site, you, as well as members of your team
                    (school, university, etc), are able to see reports on your activities,
                    which are collected by its leaders: reports on your academic performance, reports
                    on your behavior, reports on your attendance and many any. Among other things,
                    ordinary members of the team can also provide reports, that is, if your behavior is
                    inappropriate, you risk <span className="black_list_span">
                        <a style={{textDecoration: 'none', color: 'red'}} href="/blackList/">being blacklisted</a>
                    </span>.
                    You also have the opportunity to correspond with users. We sincerely rely on your discretion
                    and responsibility to ensure that you and other users do not experience any inconvenience.
                    All questions to the <a>administrators</a>.
                </p>
            );
            break;
        case "Русский (Rus)":
            text = <p className="description">
                    Добро пожаловать на сайт отчетов, пользователь. На этом сайте вы, а также члены вашей команды
                    (школы, университета и т. д.), можете видеть отчеты о своей деятельности,
                    которые собирают ее руководители: отчеты о вашей успеваемости, отчеты
                    о вашем поведении, отчеты о вашей посещаемости и многие другие. Помимо прочего,
                    рядовые члены команды также могут предоставлять отчеты, то есть, если ваше поведение
                    ненадлежащее, вы рискуете <span className="black_list_span">
                        <a style={{textDecoration: 'none', color: 'red'}} href="/blackList/">
                        быть занесенным в черный список</a>
                    </span>.
                    У вас также есть возможность переписываться с пользователями. Мы искренне полагаемся на вашу осмотрительность
                    и ответственность, чтобы гарантировать, что вы и другие пользователи не испытаете никаких неудобств.
                    Все вопросы к<a>администраторам</a>.
                </p>
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


export {getHeaderText, getHomeText, getConfigurationText, getUsersText}
