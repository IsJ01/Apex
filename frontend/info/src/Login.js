import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './css/login.css'
import './css/buttons.css'
import { get_sessionid } from './get_cookies.js';

export default function Login() {
    let navigate = useNavigate();
    const [user, setUser] = useState({});
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [error, setError] = useState(null);
    const api_url = "http://127.0.0.1:8001";

    useEffect(() => {
        document.title = 'Login';
        updateUser();
    }, []);
    
    document.title = "Login";

    function updateUser() {
        let sessionid = get_sessionid();
        axios.get(`${api_url}/current/`, 
            {headers: {'sessionid': sessionid}}).then(res => {
            if (res.data.is_authenticated) {
                setUser(res.data);
            }
        });
    }

    function changePassword(event) {
        setPassword(event.target.value);
    }

    function changeEmail(event) {
        setEmail(event.target.value);
    }

    async function login() {
        const data = {
            'email': email,
            'password': password,
        };
        axios.post(`${api_url}/login/`, data).then(res => {
            document.cookie = `sessionid=${res.data['sessionid']};path=/`
        }).then(() => {setError(null); updateUser(); navigate('/');})
        .then(() => window.location.reload(true))
        .catch(error => setError(error.response.data['detail']));
    }
    return (
        <div className='login-content'>
            {!user.is_authenticated ?
                <div>
                    <p>
                        <label htmlFor="id_email">Email:</label>
                        <input type="email" name="email" maxLength="320" 
                        required="" id="id_email" onChange={changeEmail}/>
                    </p>
                    <p>
                        <label htmlFor="id_password">Password:</label> 
                        <input type="password" name="password" maxLength="100" 
                        required="" id="id_password" onChange={changePassword}/>
                    </p>
                    {error && <p className='alert alert-danger'>{error}</p>}
                    <br/>
                    <button type="buttom" className="styleBtn styleBtn-outline-ok" 
                    onClick={login} title="Log in">Log in</button>
                </div>
            : <h1>User is already log in</h1>}
        </div>
    );
}
