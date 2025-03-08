import Chart from 'chart.js/auto';

let chart;

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

export default function update_chart(id, data) {
    let type = document.getElementById("report-chart-type").value;
    if (chart) {
        chart.destroy();
    }
    let chartData;
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
            labels: data[0],
            datasets: [{
                data: data[1],
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
        for (let ind in data[0]) {
            new_dataset.push({x: data[0][ind], y: data[1][ind]});
        }
        chartData = {
            datasets: [{
                data: new_dataset,
                borderColor : "none",
                fill: false,
            }]
        };
    }
    if (type === "Bar" || type === "Pie" || type === "Doughnut" || type === "PolarArea" || type === "Radar") {
        chartData = {
            labels: data[0],
            datasets: [{
                data: data[1],
                backgroundColor: ["rgb(29, 22, 22)", "rgb(142, 22, 22)", 
                    "rgb(216, 64, 64)", "rgb(238, 238, 238)"],
            }]
        };
    }
    chart = new Chart(document.getElementById(id).getContext("2d"), {
        type: types[type],
        data : chartData,
        options: options
    });
}