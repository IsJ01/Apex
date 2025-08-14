import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './css/register.css';
import './css/buttons.css';
import { api_url, users_api_url } from './give_objects';
import { AppContext } from './AppProvider';
import renderHeader from './header/renderHeader';

export default function Register() {

    const [error, setError] = useState("");
    const {user, updateUser, logout, updateTitle} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        renderHeader(updateUser(), logout, updateTitle(), "register");
        }, []);
    
    function register() {
        let username = document.getElementById("id-username").value;
        let number = document.getElementById("id-number").value;
        let year = document.getElementById("id-year").value;
        let password = document.getElementById("id-password").value;
        let repeatedPassword = document.getElementById("id-repeated-password").value;

        if (password !== repeatedPassword) {
            setError("Passwords don`t match");
            return;
        }
        
        axios.post(`${api_url}`, 
            {
                username: username, password: password,
                telephoneNumber: number, year: year
            }, 
            { 
                withCredentials: true, 
                headers: {"Api-Request": `${users_api_url}/api/v1/auth/sign-up`} 
            }
        )
        .then(() => {
            updateUser(); renderHeader(updateUser(), logout, updateTitle(), "register"); navigate('/');
        })
        .catch(e => setError(e.message));
    }
    
    return (
        <div className='register-content'>
            {Object.keys(user).length === 0 ?
                <div>
                    <p>
                        <label id="register-username" htmlFor="id-username">Username:</label> 
                        <input type="text" name="username" maxLength="100" required id="id-username"/>
                    </p>
                    <p>
                        <label id="register-number" htmlFor="id-number">Telephone number:</label>
                        <input type="text" name="number" maxLength="320" id="id-number"/>
                    </p>
                    <p>
                        <label id="register-year" htmlFor="id-year">Year of birth:</label> 
                        <input type="number" name="year" id="id-year"/>
                    </p>
                    <p>
                        <label id="register-password" htmlFor="id-password">Password:</label> 
                        <input type="password" name="password" require maxLength="100" id="id-password"/>
                    </p>
                    <p>
                        <label id="register-repeated-password" htmlFor="id-repeated_password">Repeat password:</label> 
                        <input type="password" name="repeat-password" maxLength="100" required id="id-repeated-password"/>
                    </p>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <br/>
                    <button style={{width: "100%", height: "35px"}} id="register-button" type="button" 
                        className="styleBtn styleBtn-outline-red-2" value="Registry" 
                        onClick={register} title='Registry'/>
                </div>
            : <h1 id="register-error">User is already log in</h1>}
        </div>
    );
}