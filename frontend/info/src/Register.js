import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import './css/register.css'
import './css/buttons.css'
import { get_sessionid } from './get_cookies.js';

export default function Register() {
    const [user, setUser] = useState({});
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');
    const [number, setNumber] = useState('');
    const [year, setYear] = useState(2000);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const api_url = "http://127.0.0.1:8001";

    useEffect(() => {
        document.title = 'Registration';
        updateUser();
    }, []);

    document.title = "Register";

    function updateUser() {
        let sessionid = get_sessionid();
        axios.get(`${api_url}/current/`, 
            {headers: {'sessionid': sessionid}}).then(res => {
            if (res.data.is_authenticated) {
                setUser(res.data);
            }
        });
    }

    function changeUserName(event) {
        setUserName(event.target.value);
    }

    function changeEmail(event) {
        setEmail(event.target.value);
    }

    function changeNumber(event) {
        setNumber(event.target.value);
    }

    function changeAbout(event) {
        setAbout(event.target.value);
    }

    function changeYear(event) {
        setYear(event.target.value);
    }

    function changePassword(event) {
        setPassword(event.target.value);
    }

    function changeRepeatPassword(event) {
        setRepeatPassword(event.target.value);
    }
    
    function register() {
        const data = {
            username: userName, 
            email: email,
            number: number,
            about: about, 
            year_of_birth: year, 
            password: password, 
            repeat_password: repeatPassword,
            withCredentials: true
        };
        axios.post(`${api_url}/`, data);
    }
    return (
        <div className='register-content'>
            {!user.is_authenticated ?
                <form>
                    <p>
                        <label htmlFor="id_username">Username:</label> 
                        <input type="text" name="username" maxLength="100" required="" id="id_username" onChange={changeUserName}/>
                    </p>
                    <p>
                        <label htmlFor="id_email">Email:</label>
                        <input type="email" name="email" maxLength="320" required="" id="id_email" onChange={changeEmail}/>
                    </p>
                    <p>
                        <label htmlFor="id_number">Telephone number:</label>
                        <input type="text" name="number" maxLength="320" required="" id="id_number" onChange={changeNumber}/>
                    </p>
                    <p>
                        <label htmlFor="id_year">Year of birth:</label> 
                        <input type="number" name="year" required="" id="id_year" onChange={changeYear}/>
                    </p>
                    <p>
                        <label htmlFor="id_about">About:</label> 
                        <input type="text" name="about" maxLength="1000" required="" id="id_about" onChange={changeAbout}/>
                    </p>
                    <p>
                        <label htmlFor="id_password">Password:</label> 
                        <input type="password" name="password" maxLength="100" required="" id="id_password" onChange={changePassword}/>
                    </p>
                    <p>
                        <label htmlFor="id_repeat_password">Repeat password:</label> 
                        <input type="password" name="repeat_password" maxLength="100" required="" id="id_repeat_password"
                        onChange={changeRepeatPassword}/>
                    </p>
                    <br/>
                    <input type="submit" className="styleBtn styleBtn-outline-ok" value="Registry" onClick={register} title='Registry'/>
                </form>
            : <h1>User is already log in</h1>}
        </div>
    );
}