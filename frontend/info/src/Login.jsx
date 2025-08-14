import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './css/login.css'
import './css/buttons.css'
import { AppContext } from './AppProvider';
import { api_url, users_api_url } from './give_objects';
import renderHeader from './header/renderHeader';


export default function Login() {

    const [error, setError] = useState("");
    const {user, logout, updateUser, updateTitle} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        renderHeader(updateUser(), logout, updateTitle(), "login");
    }, []);

    function login() {
        let username = document.getElementById("id-username").value;
        let password = document.getElementById("id-password").value;

        axios.post(`${api_url}`,
            {
                username: username, password: password
            }, 
            {
                withCredentials: true, 
                headers: { "Api-Request": `${users_api_url}/api/v1/auth/sign-in`}
            }
        )
        .then(() => {
            updateUser(); renderHeader(updateUser(), logout, updateTitle(), "login"); navigate('/');
        })
        .catch(error => setError(error.message));
    }

    return (
        <div className='login-content'>
            {Object.keys(user).length === 0 ?
            <div>
                <p>
                    <label id="login-username" htmlFor="id-username">Username</label>
                    <input type="text" name="username" maxLength="320" 
                        required id="id-username"/>
                </p>
                <p>
                    <label id="login-password" htmlFor="id-password">Password</label> 
                    <input type="password" name="password" maxLength="100" 
                        required id="id-password"/>
                </p>
                {error && <p className="alert alert-danger">{error}</p>}
                <br/>
                <button style={{width: "100%", height: "35px"}} id="login-button" type="buttom" 
                    className="styleBtn styleBtn-outline-red-2" 
                    onClick={login} title="Log in">Log in</button>
            </div>
            : <h1 id="login-error">User is already log in</h1>}
        </div>
    );
}
