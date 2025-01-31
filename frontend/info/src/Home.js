import './css/home.css';
import { getHomeText } from './getText';

export default function Home(props) {

    let text = getHomeText(props.lang);

    return (
        <div className='home-content'>
            <h1 className="home_title">UCOR</h1>
            {text}
        </div>
    );
}