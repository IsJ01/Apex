import { get_statuses } from "../give_objects.js";
import { get_task_statisc } from "./get_statistics.js";

import Chart from "chart.js/auto";

function setStatistic(id) {
    let chart = Chart.getChart("statistic-chart");
    if (chart) {
        chart.destroy();
    }
    const statistic = get_task_statisc(id);
    console.log(Object.keys(statistic))
    new Chart("statistic-chart",
        {
            type: "pie",
            data: {
                labels: [...Object.keys(statistic)],
                datasets: [{
                    data: [...Object.values(statistic)],
                    backgroundColor: ['rgb(29, 22, 22)', 'rgb(238, 238, 238)', 'rgb(142, 22, 22)']
                }]
            }
        }
    );

}

export default function StatisticRow(props) {

    const image = props.data.image ? props.data.image : '/static/media/User.c111d80991fc4792183f.png';
    const image_size = 20;

    return (
        <div onClick={() => setStatistic(props.data.id)} className="statistic-row">
            <div className="statistic-row-field statistic-row-name">
                <img width={image_size} height={image_size} style={{borderRadius: image_size}} src={image}/>
                <span style={{marginLeft: "10px"}}>{props.data.username}</span>
            </div>
            <div className="statistic-row-field">{props.data.email}</div>
        </div>
    );
}
