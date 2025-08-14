import { useContext, useEffect } from 'react';
import { AppContext } from './AppProvider';
import './css/inbox.css';
import renderHeader from './header/renderHeader';

export default function Inbox() {

    const {logout, updateUser, updateTitle} = useContext(AppContext);

    useEffect(() => {
        renderHeader(updateUser(), logout, updateTitle(), "inbox");
    }, []);

    return (
        <div className='home-content'>
            <h1 className="home_title">UCOR</h1>
            <br/>
            <div id="inbox-description" className="home-description">
                Welcome to UCOR - open source software for workflow automation, task management, 
                document approval and business communications.
            </div>
            <br/>
            <div id="inbox-qualification" className="home-qualification">
                If you encounter any <span style={{color: "rgb(210, 0, 0)"}}>errors</span> or inconveniences while working, 
                or have any <span style={{color: "rgb(210, 0, 0)"}}>suggestions</span>, 
                please write to the developer by email: <a href="mailto:is067isj01@gmail.com">is067isj01@gmail.com</a>
            </div>
        </div>
    );
}