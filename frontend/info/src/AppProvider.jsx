import { createContext, useState } from "react";
import { users_api_url } from "./give_objects";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [title, setTitle] = useState("");
    
    const updateUser = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${users_api_url}/api/v1/users/current`, false);
        xhr.setRequestHeader("Authorization", localStorage.getItem("Authorization"));
        xhr.withCredentials = true;
        xhr.onerror = () => {};
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
        localStorage.setItem("Authorization", "")
        window.location.reload(true);
    };

    return (
        <AppContext.Provider value={{ user, setUser, updateUser, logout, title, setTitle, updateTitle }}>
            {children}
        </AppContext.Provider>
    );

}
