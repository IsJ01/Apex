import { useState } from "react";
import FieldsInput from "./FieldsInput";

export default function NewChart(props) {
    const [mode, setMode] = useState("Fields");
    const [type, setType] = useState("Line");
    const [chartMode, setChartMode] = useState("Graph");

    let types = {
        "Graph": ["Line", "Tension Line", "Scatter"],
        "Diagram": ["Bar", "Pie", "Doughnut", "PolarArea", "Radar"]
    };

    let inputs;

    inputs = <FieldsInput inpType={mode} mode={chartMode} type={type}/>;

    return (
        <div className="new-report-chart-panel">
            <div className="new-chart-settings">
                <div className="new-chart-settings-row">
                    <div className="new-chart-settings-field">
                        <label>Chart type</label>
                        &nbsp;
                        <select style={{height: "21px"}} onChange={e => {
                            setChartMode(e.target.value); 
                            setType(types[e.target.value][0]);
                        }} 
                        className="task-dialog-btn" id="report-chart-mode">
                            <option>Graph</option>
                            <option>Diagram</option>
                        </select>  
                        <select style={{height: "21px"}} onChange={e => setType(e.target.value)} 
                        className="task-dialog-btn" id="report-chart-type">
                            {types[chartMode].map(t => <option>{t}</option>)}
                        </select>  
                    </div>
                    <div className="new-chart-settings-field">
                        <label>Input type</label>
                        &nbsp;
                        <select style={{height: "21px", marginTop: "5px"}} onChange={e => setMode(e.target.value)} 
                        className="task-dialog-btn" id="graph-input-type">
                            <option>Fields</option>
                            <option>File</option>
                        </select>
                    </div>
                </div>
                <div className="new-chart-input">
                    {inputs}
                </div>
            </div>
            <div className="new-chart-cont">
                <canvas id="new-chart" className="new-report-chart"></canvas>
            </div>
        </div>
    );
}