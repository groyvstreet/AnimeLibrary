import './App.css';
import {BrowserRouter} from "react-router-dom";
import Layout from "./components/Layout";
import Router from "./components/Router";
import {AuthContext} from "./context";
import {useEffect, useState} from "react";
import axios from "axios";
import UsersService from "./API/UsersService";

function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token')
        UsersService.getAuth(token)
            .then(response => {
                if (response.ok) {
                    setIsAuth(true)
                } else {
                    setIsAuth(false)
                }
                return response.json()
            })
            .then((data) => {
                setUser(data)
                if (!isAuth) {
                    setUser({username: ''})
                }
            })

    }, [isAuth])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            user,
            setUser
        }}>
            <BrowserRouter>
                <Layout/>
                <Router/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;
