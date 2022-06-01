import React, {useState} from "react";
import UsersService from "../API/UsersService";
import {useNavigate} from "react-router-dom";
import {isArray} from "axios/lib/utils";
import {useEffect} from "react";

function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const navigate = useNavigate();
    const [usernameErrors, setUsernameErrors] = useState([])
    const [passwordErrors, setPasswordErrors] = useState([])
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [isSended, setIsSended] = useState(false)

    useEffect(() => {
        if (username.length === 0 || email.length === 0 || password.length === 0 || checkPassword.length === 0 ||
            password !== checkPassword) {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    }, [username, password, checkPassword])

    const signup = (event) => {
        event.preventDefault()
        if (password === checkPassword) {
            UsersService.signup(username, email, password)
                .then(response => {
                    return response.json()
                })
                .then((data) => {
                    if (isArray(data.username)) {
                        setUsernameErrors(data.username)
                        setPasswordErrors([])
                    } else if (isArray(data.password)) {
                        setPasswordErrors(data.password)
                        setUsernameErrors([])
                    } else {
                        setIsSended(true)
                        setUsername('')
                        setEmail('')
                        setPassword('')
                        setCheckPassword('')
                    }
                })
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-6">
                    {isSended && <div className="text-center">На вашу почту было отправлено письмо для завершения регистрации.</div>}
                    <div className="card text-center mt-5" style={{borderRadius: '30px'}}>
                        <div className="card-header bg-transparent">
                            <strong className="text-success">
                                Регистрация
                            </strong>
                        </div>
                        <div className="card-body">
                            <form>
                                {usernameErrors.length !== 0 && usernameErrors.map((error) =>
                                    <label className="text-danger">{error}</label>
                                )}
                                {passwordErrors.length !== 0 && passwordErrors.map((error) =>
                                    <label className="text-danger">{error}</label>
                                )}
                                <input className="form-control mb-3 is-valid" value={username}
                                       onChange={e => setUsername(e.target.value)}
                                       placeholder="Введите имя пользователя"/>
                                <input className="form-control mb-3 is-valid" value={email}
                                       onChange={e => setEmail(e.target.value)}
                                       placeholder="Введите email"/>
                                <input className="form-control mb-3 is-valid" value={password}
                                       onChange={e => setPassword(e.target.value)}
                                       placeholder="Введите пароль"/>
                                <input className="form-control mb-3 is-valid" value={checkPassword}
                                       onChange={e => setCheckPassword(e.target.value)}
                                       placeholder="Подтвердите пароль"/>
                                <button className="btn btn-success" onClick={signup} disabled={isButtonDisabled}>
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
