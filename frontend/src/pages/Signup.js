import React, {useState} from "react";
import UsersService from "../API/UsersService";
import {useNavigate} from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const navigate = useNavigate();

    const signup = (event) => {
        event.preventDefault()
        if (password === checkPassword) {
            UsersService.signup(username, password).then(() => {navigate('/login')})
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-4">
                    <div className="card text-center mt-5" style={{borderRadius: '30px'}}>
                        <div className="card-header bg-transparent">
                            <strong className="text-success">
                                Регистрация
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
                                <input className="form-control mb-3" value={checkPassword}
                                       onChange={e => setCheckPassword(e.target.value)}
                                       placeholder="Подтвердите пароль"/>
                                <button className="btn btn-success" onClick={signup}>
                                    Регистрация
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
