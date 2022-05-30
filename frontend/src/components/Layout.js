import logo from "../logo.svg";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../context";
import axios from "axios";
import UsersService from "../API/UsersService";

function Layout() {
    const navigate = useNavigate();
    const {isAuth, setIsAuth, user} = useContext(AuthContext)
    const [active, setActive] = useState(0)

    const logout = (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')
        UsersService.logout(token).then(() => {
            localStorage.removeItem('token')
            setIsAuth(false)
            //window.location.replace('http://localhost:3000/');
        })
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light sticky-top" style={{background: 'radial-gradient(at top, #FEFFFF, #A7CECC)'}}>
            {/*<a className="navbar-brand" href="#">*/}
            {/*    <img className="App-logo" src={logo} alt=""/>*/}
            {/*    Kraken*/}
            {/*</a>*/}
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className={active === 0 ? 'nav-item active' : 'nav-item'} onClick={() => {
                        setActive(0)
                    }}>
                        <Link className="nav-link" to="/">Главная</Link>
                    </li>
                    <li className={active === 1 ? 'nav-item active' : 'nav-item'} onClick={() => {
                        setActive(1)
                    }}>
                        <Link className="nav-link" to="/animes">Аниме</Link>
                    </li>
                    <li className={active === 2 ? 'nav-item active' : 'nav-item'} onClick={() => {
                        setActive(2)
                    }}>
                        <Link className="nav-link" to="/users">Пользователи</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {isAuth
                        ?
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="frontend/src/components/Layout#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {user.username}
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to={`/${user.username}`}>Профиль</Link>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" style={{cursor: 'pointer'}} onClick={logout}>Выход</a>
                            </div>
                        </li>
                        :
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Регистрация</Link>
                        </li>}
                    {isAuth
                        ?
                        <div></div>
                        :
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Вход</Link>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Layout;
