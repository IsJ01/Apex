import axios from "axios";
import { cols_api_url, fields_api_url, rows_api_url, services_api_url, tabs_api_url } from "../../give_objects";


export async function apply(id) {

    let service_name = document.getElementById("new-service-name").value;

    let lst = document.getElementById("tables-list").children;

    if (id) {
        console.log(id)
        await axios.delete(`${services_api_url}/${id}/`)
        .catch(() => alert("Update Error!"));
    }
    await axios.post(`${services_api_url}/`, {
        name: service_name
    })
    .then(async res => {
        for (let tab of lst) {
            await axios.post(`${tabs_api_url}/`, {
                serviceId: res.data.id,
                name: tab.children[0].children[1].value
            }).then(async tb => {
                let columns = tab.children[0].children[2].children[0].children[0].children;
                let cols_id = [];

                for (let col of columns) {
                    await axios.post(`${cols_api_url}/`, {
                        tabId: tb.data.id,
                        value: col.children[0].value
                    })
                    .then(res => {
                        cols_id.push(res.data.id);
                    })
                    .catch(() => alert("Error!"));
                }
                
                let rows = [...tab.children[0].children[2].children[1].children];

                for (let row in rows) {
                    await axios.post(`${rows_api_url}/`, {
                        tabId: tb.data.id
                    }).then(async row_res => {
                        for (let f_ind in [...rows[row].children]) {
                            await axios.post(`${fields_api_url}/`, {
                                rowId: row_res.data.id,
                                colId: cols_id[f_ind],
                                value: rows[row].children[f_ind].children[0].value
                            });
                        }
                    }
                    );
                }
            })
            .catch(() => alert("Error!"));
        }
    })

}