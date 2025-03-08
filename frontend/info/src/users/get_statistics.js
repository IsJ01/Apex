import { get_statuses, get_tasks } from "../give_objects";

export function get_task_statisc(id) {
    let stat = {};
    for (let status of get_statuses()) {
        stat[status] = 0;
    }
    for (let task of get_tasks().content) {
        if (task.responsible === id) {
            stat[task.status] += 1;
        }
    }
    return stat;
}
