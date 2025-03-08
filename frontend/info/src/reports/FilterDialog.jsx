import CancelButton from "../reusable/CancelButton";

export default function FilterDialog(props) {

    function set_report_filters() {
    }

    return (
        <dialog id="filter-dialog" className="filter-dialog">
            <CancelButton func={() => {document.getElementById('filter-dialog').close()}}/>
            <form method="dialog" id="filter-form">
                <p>
                    <label>Title:</label>
                    <input id="report-title-field"/>
                </p>
                <p>
                    <label>To:</label>
                    <input id="report-to-field"/>
                </p>
                <p>
                    <label>From:</label>
                    <input id="report-from-field"/>
                </p>
                <p>
                    <label>Category:</label>
                    <input id="report-category-field"/>
                </p>
                <p>
                    <label>Details:</label>
                    <input id="report-details-field"/>
                </p>
                <p>
                    <label>Status:</label>
                    <input id="report-status-field"/>
                </p>
            </form>
            <div className="dialog-buttons">
                <button className="styleBtn-outline-normal" title="Apply changes" onClick={set_report_filters}>Apply</button>
                <button className="styleBtn-outline-normal" type="button" 
                onClick={() => {document.getElementById('filter-dialog').close()}} title="Cancel changes">Cancel</button>
            </div>
        </dialog>
    );
}