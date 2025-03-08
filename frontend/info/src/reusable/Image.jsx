export default function Image(props) {

    function hover(e) {
        if (props.hoverSrc) {
            e.target.setAttribute('src', props.hoverSrc);
        }
      }
      
    function unhover(e) {
        e.target.setAttribute('src', props.src);
    }

    return (
        <img src={props.src} className={props.className} onMouseOver={hover} onMouseOut={unhover}/>
    );
}