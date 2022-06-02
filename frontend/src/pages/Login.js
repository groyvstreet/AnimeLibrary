import React, {useEffect, useState} from "react";
import {useContext} from "react";
import {AuthContext} from "../context";
import UsersService from "../API/UsersService";
import {useNavigate} from "react-router-dom";

function Login() {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isBadData, setIsBadData] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        if (username.length === 0 || password.length < 8) {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    }, [username, password])

    const login = (event) => {
        event.preventDefault()
        UsersService.login(username, password)
            .then(response => {
                if (response.status !== 400) {
                    return response.json()
                }
                return {auth_token: 'undefined'}
            })
            .then((data) => {
                if (data.auth_token !== 'undefined') {
                    localStorage.setItem('token', data.auth_token)
                    setIsAuth(true)
                    navigate(`/${username}`)
                } else {
                    setIsBadData(true)
                }
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
                                {isBadData && <label className="text-danger">Неверные логин или пароль</label>}
                                <input className="form-control mb-3 is-valid" value={username}
                                       onChange={e => setUsername(e.target.value)}
                                       placeholder="Введите имя пользователя"/>
                                <input className="form-control mb-3 is-valid" value={password}
                                       onChange={e => setPassword(e.target.value)}
                                       placeholder="Введите пароль"/>
                                <button className="btn btn-success" onClick={login} disabled={isButtonDisabled}>
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
