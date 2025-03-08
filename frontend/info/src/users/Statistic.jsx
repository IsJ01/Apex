import { get_users } from "../give_objects";
import StatisticRow from "./StatiscticRow";

export default function Statistic(props) {

    const users = get_users().filter(u => !u.is_superuser).map(u => <StatisticRow data={u}/>);

    return (
        <div className="statistics">
            <div className="statistics-cont">
                <div className="users-rows">
                    {users}
                </div>
                <div className="statistic-panel">
                    <canvas id="statistic-chart"></canvas>
                </div>
            </div>
        </div>
    );
}