import { get_reports_by_of, get_reports_by_to } from "../give_objects";
import CategoryFilter from "./CategoryFilter";
import ReportBlock from "./ReportBlock";

export default function ReportsOf(props) {

    let func = props.mode === 'of' ? get_reports_by_of : get_reports_by_to

    let reports;

    let filter;
    if (props.catFilter !== "") {
        filter = <CategoryFilter catFilter={props.catFilter} setCatFilter={props.setCatFilter} />
        reports = func(props.user.id).filter(r => r.category.name === props.catFilter)
        .map(r => <ReportBlock of={props.user.id} data={r}/>);
    } else {
        reports = func(props.user.id)
        .map(r => <ReportBlock of={props.user.id} data={r}/>);
    }

    return (
        <div className="reports-cont">
            {filter}
            <div className="reports-list">
                {reports}
            </div>
        </div>
    );
}