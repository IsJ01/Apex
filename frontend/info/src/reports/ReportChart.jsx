import { useEffect } from "react";
import Chart from 'chart.js/auto';

let types = {
    "Line": 'line',
    "Scatter": "scatter",
    "Tension Line": "line",
    "Bar": "bar",
    "Pie": "pie",
    "Doughnut": "doughnut",
    "PolarArea": "polarArea",
    "Radar": "radar"
}

function draw_chart(data) {
    if (Chart.getChart("chart")) {
        return
    }
    let chartData;
    let type = data.type;
    let options = {
        responsive: true,
        scales: {
            y: {
                ticks: {
                    color: "rgb(29, 22, 22)",
                    font: {
                        size: "10rem"
                    }
                }
            },
            x: {
                ticks: {
                    color: "rgb(29, 22, 22)",
                    font: {
                        size: "10rem"
                    }
                }
            },
        }
    };
    if (type === "Line" || type === "Tension Line") {
        chartData = {
            labels: data.labels.map(l => l.content),
            datasets: [{
                label: "Chart",
                data: data.values.map(v => v.content),
                borderColor : "rgb(142, 22, 22)",
                fill: false
            }]
        };
        if (type === "Tension Line") {
            chartData.datasets[0].tension = 0.4
        }
    }
    if (type === "Scatter") {
        let new_dataset = [];
        for (let ind in data.labels) {
            new_dataset.push({x: data.labels[ind].map(l => l.content), y: data.values[ind].map(v => v.content)});
        }
        chartData = {
            datasets: [{
                label: "Chart",
                data: new_dataset,
                borderColor : "none",
                fill: false,
            }]
        };
    }
    if (type === "Bar" || type === "Pie" || type === "Doughnut" || type === "PolarArea" || type === "Radar") {
        chartData = {
            labels: data.labels.map(l => l.content),
            datasets: [{
                data: data.values.map(v => v.content),
                backgroundColor: ["rgb(29, 22, 22)", "rgb(142, 22, 22)", 
                    "rgb(216, 64, 64)", "rgb(238, 238, 238)"],
            }]
        };
    }
    new Chart(document.getElementById("chart").getContext("2d"), {
        type: types[type],
        data : chartData,
        options: options
    });
}

export default function ReportChart(props) {

    useEffect(() => {
        draw_chart(props.data)
    }, []);

    return (
        <canvas id="chart"></canvas>
    );
}