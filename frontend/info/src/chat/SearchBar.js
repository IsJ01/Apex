import './css/search_bar.css';

export default function SearchBar(props) {
    return (
        <div className="search-bar">
            <label className="search-bar-label" htmlFor="searchbar">
                <span className="search-bar-title">Chats</span>
                <input onChange={props.onSearch} className="search-bar-input" id="search-bar" placeholder="Search"/>
            </label>
            <button className="search-bar-button" 
                onClick={() => {document.getElementById("add-chat-dialog").showModal();}}>
                    Add
            </button>
        </div>
    );
}