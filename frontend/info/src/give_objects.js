// модуль для получения объектов из api
const api_url = "http://localhost:80"
const users_api_url = "/api/auth";
const reports_api_url = "http://127.0.0.1:8002/api/v1";
const reports_api_url_clear = "http://127.0.0.1:8002";
const black_list_api_url = "http://127.0.0.1:8003";
const data_api_url = "http://127.0.0.1:8004";

const report_categories_api_url = "http://127.0.0.1:8002/api/v1/categories";
const tasks_api_url = "http://127.0.0.1:8007/api/v1";
const task_status_api_url = "http://127.0.0.1:8007/api/v1/statuses";
const chats_api_url = "http://127.0.0.1:8008/api/v1/chats";
const messages_api_url = "http://127.0.0.1:8008/api/v1/messages";
const tables_api_url = "http://127.0.0.1:8009/api/v1/tables";
const services_api_url = "http://127.0.0.1:8010/api/v1/virtualServices";
const rows_api_url = "http://127.0.0.1:8010/api/v1/rows";
const fields_api_url = "http://127.0.0.1:8010/api/v1/fields";
const tabs_api_url = "http://127.0.0.1:8010/api/v1/tabs";
const cols_api_url = "http://127.0.0.1:8010/api/v1/cols";
const pages_api_url = "http://127.0.0.1:8011/api/v1/pages";
const elements_api_url = "http://127.0.0.1:8011/api/v1/elements";
const props_api_url = "http://127.0.0.1:8011/api/v1/properties";

// данная функция получает api и возвращает функцию, которая возвращает объекты данного api

function get_objects(api) {
    return function() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${api}/`, false);
        xhr.send();
        return JSON.parse(xhr.responseText);
    } 
}

let get_users = get_objects(users_api_url);
let get_reports = get_objects(reports_api_url);
let get_black_list = get_objects(black_list_api_url);
// let get_user_categories = get_objects(user_categories_api_url);
let get_report_categories = get_objects(report_categories_api_url);
let get_organization_data = get_objects(data_api_url);
let get_tasks = get_objects(tasks_api_url);
let get_chats = get_objects(chats_api_url);
let get_messages = get_objects(messages_api_url);
let get_services = get_objects(services_api_url);
let get_rows = get_objects(rows_api_url);
let get_fields = get_objects(fields_api_url);
let get_pages = get_objects(pages_api_url);
let get_elements = get_objects(elements_api_url);
let get_properties = get_objects(props_api_url);
let get_cols = get_objects(cols_api_url);
let get_tabs = get_objects(tabs_api_url);
let get_statuses = get_objects(task_status_api_url);


function get_user(id) {
    let users = get_users();
    return users.filter(user => user.id === id)[0];
}

function get_user_from_email(email) {
    let users = get_users();
    return users.filter(user => user.email === email)[0];
}

function get_report(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${reports_api_url}/${id}/`, false);
    xhr.setRequestHeader("sessionid", "");
    xhr.send();
    if (xhr.responseText) {
        return JSON.parse(xhr.responseText);
    }
    return {};
}

function get_black_user(id) {
    let black_list = get_black_list();
    return black_list.filter(bu => bu.id === id)[0];
}

// function get_user_category(id) {
//     let user_categories = get_user_categories();
//     return user_categories.filter(cat => cat.id === id)[0];
// }

function get_report_category(id) {
    let report_categories = get_report_categories();
    return report_categories.filter(cat => cat.id === id)[0];
}

function get_data_field(id) {
    let data = get_organization_data();
    return data.filter(field => field.id === id)[0];
}

function get_page_tree_by_id(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${pages_api_url}/${id}/tree/`, false);
    xhr.send();
    let page = JSON.parse(xhr.responseText);
    return page;
}

function get_pages_tree() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${pages_api_url}/tree/`, false);
    xhr.send();
    let page = JSON.parse(xhr.responseText);
    return page;
}

function get_page_by_id(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${pages_api_url}/${id}/`, false);
    xhr.send();
    let page = JSON.parse(xhr.responseText);
    return page;
}

function isPageExist(uri) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${pages_api_url}/exist/${uri}/`, false);
    xhr.send();
    let page = JSON.parse(xhr.responseText);
    return page;
}

function get_service_by_id(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${services_api_url}/${id}/`, false);
    xhr.send();
    let page = JSON.parse(xhr.responseText);
    return page;
}

function get_service_by_name(name) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${services_api_url}/service/${name}/`, false);
    xhr.send();
    let page = JSON.parse(xhr.responseText);
    return page;
}

function get_task_params(filter) {
    return `of=${filter.of}&` + 
    `title=${filter.title}&` + 
    `responsible=${filter.responsible}&` + 
    `firstDate=${filter.firstDate}&` + 
    `lastDate=${filter.lastDate}&` + 
    `status=${filter.status}&` + 
    `repetitive=${filter.repetitive}`;
}

function get_task_filter_params(filter) {
    let of = filter.of ? get_user_from_email(filter.of).id : "";
    return get_task_params({...filter, of: of})
}

function get_task_filter_params_of(filter) {
    let of = filter.of ? get_user_from_email(filter.of).id : "";
    let responsible = filter.responsible ? get_user_from_email(filter.responsible).id : "";
    return get_task_params({...filter, of: of, responsible: responsible})
}

function get_filter_tasks(filter) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${tasks_api_url}/?${get_task_filter_params(filter)}`, false);
    xhr.send();
    let page = JSON.parse(xhr.responseText);
    return page;
}

function get_filter_tasks_of(filter) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${tasks_api_url}/?${get_task_filter_params_of(filter)}`, false);
    xhr.send();
    let page = JSON.parse(xhr.responseText);
    return page;
}

function get_report_category_by_name(name) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${report_categories_api_url}/`, false);
    xhr.send();
    let data = JSON.parse(xhr.responseText);
    for (let cat of data) {
        if (cat.name === name) {
            return cat;
        }
    }
}

function get_reports_by_of(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${reports_api_url}/byOf/${id}/`, false);
    xhr.send();
    let data = JSON.parse(xhr.responseText);
    return data;
}

function get_reports_by_to(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${reports_api_url}/byTo/${id}/`, false);
    xhr.send();
    let data = JSON.parse(xhr.responseText);
    return data;
}

export {
    api_url,
    users_api_url, reports_api_url, black_list_api_url, report_categories_api_url, data_api_url, 
    tasks_api_url, chats_api_url, messages_api_url, tables_api_url, services_api_url, rows_api_url, fields_api_url, 
    pages_api_url, elements_api_url, props_api_url, cols_api_url, tabs_api_url, reports_api_url_clear,
    get_services, get_rows, get_fields,get_users, get_reports, get_black_list, get_report_categories, 
    get_organization_data, get_user, get_user_from_email, get_report, get_black_user, get_report_category, 
    get_data_field, get_tasks, get_chats, get_messages, get_pages, get_elements, get_properties, get_page_tree_by_id, get_page_by_id,
    isPageExist, get_pages_tree, get_cols, get_tabs, get_service_by_id, get_service_by_name, get_statuses, get_filter_tasks,
    get_filter_tasks_of, get_report_category_by_name, get_reports_by_of, get_reports_by_to
}


