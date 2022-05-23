import React, {useState} from "react";
import {useContext} from "react";
import {AuthContext} from "../context";
import axios from "axios";

function Login() {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = (event) => {
        event.preventDefault()
        axios.post('http://127.0.0.1:8000/api/token/login', {
            username: username,
            password: password,
        })
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.auth_token)
                    setIsAuth(true)
                } else {
                    throw Error(`Something went wrong: code ${response.status}`)
                }
            })
            .catch(error => {
                console.log(error)
                setIsAuth(false)
            })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-4">
                    <div className="card text-center mt-5" style={{borderRadius: '30px'}}>
                        <div className="card-header bg-transparent">
                            <strong className="text-success">
                                Вход
                            </strong>
                        </div>
                        <div className="card-body">
                            <form>
                                <input className="form-control mb-3" value={username}
                                       onChange={e => setUsername(e.target.value)}
                                       placeholder="Введите имя пользователя"/>
                                <input className="form-control mb-3" value={password}
                                       onChange={e => setPassword(e.target.value)}
                                       placeholder="Введите пароль"/>
                                <button className="btn btn-outline-success" onClick={login}>
                                    Вход
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
