import React, {useState} from "react";

function Signup() {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')

    const signup = (event) => {
        event.preventDefault()

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
                                <input className="form-control mb-3" value={userName}
                                       onChange={e => setUserName(e.target.value)}
                                       placeholder="Введите имя пользователя"/>
                                <input className="form-control mb-3" value={email}
                                       onChange={e => setEmail(e.target.value)}
                                       placeholder="Введите почту"/>
                                <input className="form-control mb-3" value={password}
                                       onChange={e => setPassword(e.target.value)}
                                       placeholder="Введите пароль"/>
                                <input className="form-control mb-3" value={checkPassword}
                                       onChange={e => setCheckPassword(e.target.value)}
                                       placeholder="Подтвердите пароль"/>
                                <button className="btn btn-outline-success" onClick={signup}>
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
