import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './css/register.css';
import './css/buttons.css';
import { users_api_url } from './give_objects';
import { AppContext } from './AppProvider';
import renderHeader from './header/renderHeader';
import { getRegisterText } from './getText';
import getLang from './getLang';

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
        
        axios.post(`${users_api_url}/api/v1/auth/sign-up`, 
            {
                username: username, password: password,
                telephoneNumber: number, year: year
            }
        )
        .then((res) => {
            localStorage.setItem("Authorization", "Bearer " + res.data.token)
            updateUser(); 
            renderHeader(updateUser(), logout, updateTitle(), "register"); 
            navigate('/');
        })
        .catch(e => setError(e.message));
    }
    
    const text = getRegisterText(getLang());
    
    return (
        <div className='register-content'>
            {Object.keys(user).length === 0 ?
                <div>
                    <p>
                        <label id="register-username" htmlFor="id-username">{text.username}</label> 
                        <input type="text" name="username" maxLength="100" required id="id-username"/>
                    </p>
                    <p>
                        <label id="register-number" htmlFor="id-number">{text.number}</label>
                        <input type="text" name="number" maxLength="320" id="id-number"/>
                    </p>
                    <p>
                        <label id="register-year" htmlFor="id-year">{text.year}</label> 
                        <input type="number" name="year" id="id-year"/>
                    </p>
                    <p>
                        <label id="register-password" htmlFor="id-password">{text.password}</label> 
                        <input type="password" name="password" require maxLength="100" id="id-password"/>
                    </p>
                    <p>
                        <label id="register-repeated-password" htmlFor="id-repeated_password">{text.repeatedPassword}</label> 
                        <input type="password" name="repeat-password" maxLength="100" required id="id-repeated-password"/>
                    </p>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <br/>
                    <button style={{width: "100%", height: "35px"}} id="register-button" type="button" 
                        className="styleBtn styleBtn-outline-red-2"
                        onClick={register} title='Registry'>{text.button}</button>
                </div>
            : <h1 id="register-error">{text.error}</h1>}
        </div>
    );
}