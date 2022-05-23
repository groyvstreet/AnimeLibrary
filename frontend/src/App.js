import './App.css';
import {BrowserRouter} from "react-router-dom";
import Layout from "./Layout";
import Router from "./components/Router";
import {AuthContext} from "./context";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [isAuth, setIsAuth] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: "Token " + token
        }
        axios.get('http://127.0.0.1:8000/api/user')
            .then(response => {
                if (response.status !== 200) {
                    throw Error(`Something went wrong: code ${response.status}`)
                }
            })
            .catch(error => {
                console.log(error)
                setIsAuth(false)
            })

    }, [isAuth])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
        }}>
            <BrowserRouter>
                <Layout/>
                <Router/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;
