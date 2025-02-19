import axios from "axios";
import { elements_api_url, pages_api_url, props_api_url, isPageExist } from "../../give_objects";

async function add_elements(pageId, parentId, curr) {
    let value = curr.children[0].children[1].value;

    await axios.post(`${elements_api_url}/`, {
        pageId: pageId,
        parentId: parentId,
        value: value
    }).then(async res => {
        let props = {...JSON.parse(curr.getAttribute("props")), ...JSON.parse(curr.getAttribute("req"))};
        for (let key in props) {
            axios.post(`${props_api_url}/`, {
                elementId: res.data.id,
                name: key,
                value: props[key]
            });
        }

        for (let ch of curr.children[1].children) {
            await add_elements(pageId, res.data.id, ch);
        }
    });    
}

async function setElements(id) {
    let parent = document.getElementById("elements-form-list");
    for (let el of parent.children) {
        await add_elements((id), -1, el);
    }
}

export default async function apply() {
    let page_name = document.getElementById("new-form-entry").value;
    if (isPageExist(page_name)) {
        await axios.delete(`${pages_api_url}/byUri/${page_name}/`);
    }
    await axios.post(`${pages_api_url}/`, {
        uri: page_name
    })
    .then(async res => {
        await setElements(res.data.id);
    }).then(() => window.location.reload());
}