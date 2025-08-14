import { createContext, useState } from "react";
import { api_url, users_api_url } from "./give_objects";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [title, setTitle] = useState("");

    const updateUser = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${api_url}`, false);
        xhr.setRequestHeader("Api-Request", `${users_api_url}/api/v1/users/current`);
        xhr.withCredentials = true;
        xhr.send();
        if (xhr.responseText) {
            let data = JSON.parse(xhr.responseText);
            setUser(data);
            return data;
        }
        return {};
    }

    const updateTitle = () => {
        // const xhr = new XMLHttpRequest();
        // xhr.open("GET", `${api_url}`, false);
        // xhr.setRequestHeader("Api-Request", `${}/api/v1/`);
        // xhr.withCredentials = true;
        // xhr.onerror = () => {};
        // xhr.send();
        // if (xhr.responseText) {
        //     let data = JSON.parse(xhr.responseText);
        //     setTitle(data);
        //     return data;
        // }
        // return {};
        return "USSR"
    }

    const logout = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${api_url}`, false);
        xhr.setRequestHeader("Api-Request", `${users_api_url}/api/v1/users/logout`);
        xhr.withCredentials = true;
        xhr.onerror = () => {};
        xhr.send();
        setUser({});
        window.location.reload(true);
    };

    return (
        <AppContext.Provider value={{ user, setUser, updateUser, logout, title, setTitle, updateTitle }}>
            {children}
        </AppContext.Provider>
    );

}
