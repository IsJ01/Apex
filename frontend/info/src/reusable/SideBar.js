import '../css/sideBar.css';


export default function SideBar(props) {
    let sections = {};
    let style = {
        width: '100%',
        background: 'none',
        listStyleType: 'none',
        border: '1px solid black',
        cursor: 'pointer',
        paddingTop: '5.5px',
        paddingBottom: '5.5px',
        marginBottom: '-1px',
    }

    function focusOut() {
        for (let btn of document.getElementById('sideBar').children) {
            btn.style.background = 'white';
            btn.style.color = 'black';
        }
    }

    function select(func) {
        return function(event) {
            focusOut();
            func(event);
            event.target.style.background = 'black';
            event.target.style.color = 'white';
        }
    }
    function select_section(event) {
        let [name, type] = event.target.value.split(" ");
        if (type == "⮟") {
            for (let chapter of sections[name]) {
                let element = document.getElementById(chapter);
                element.type = 'hidden';
            }
            event.target.value = `${name} ⮞`;
        } else {
            for (let chapter of sections[name]) {
                let element = document.getElementById(chapter);
                element.type = 'button';
            }
            event.target.value = `${name} ⮟`;
        }
    }

    let rows = [];
    for (let row of props.rows) {
        if (!Array.isArray(Object.values(row)[0])) {
            rows.push(<input type="button" style={style} 
                onClick={select(row.onclick)} className={row.className} 
                id={row.id} value={row.text}/>);
        } 
        else {
            rows.push(<input type="button" onClick={select_section} style={{textAlign: "end", height: "25px",
                ...style, paddingTop: '0px', paddingBottom: '0px', lineHeight: '1px'}}
                className="section" id={Object.keys(row)[0]} value={`${Object.keys(row)[0]} ⮟`}/>);

            sections[Object.keys(row)[0]] = [];

            for (let section of Object.values(row)[0]) {
                rows.push(
                    <input type="button" style={style} 
                        onClick={select(section.onclick)} className={section.className}
                        id={section.id} value={section.text}/>
                );
                    sections[Object.keys(row)[0]].push(section.id);
            }
            rows.push(<div style={{height: '10px'}}></div>);
        }
    }
    return (
        <div className="sideBar" id="sideBar">
            {rows}
        </div>
    );
}