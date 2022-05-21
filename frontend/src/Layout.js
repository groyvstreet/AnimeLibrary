import logo from "./logo.svg";
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "./context";

function Layout() {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const [active, setActive] = useState(0)

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
            {/*<a className="navbar-brand" href="#">
                <img className="App-logo" src={logo} alt=""/>
                Kraken
            </a>*/}
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
                        <Link className="nav-link" to="/about">Пользователи</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {isAuth
                        ?
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                user
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Профиль</a>
                                <a className="dropdown-item" href="#">Личный список</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Выход</a>
                            </div>
                        </li>
                        :
                        <li className="nav-item">
                            <a className="nav-link" href="#">Регистрация</a>
                        </li>}
                    {isAuth
                        ?
                        <div></div>
                        :
                        <li className="nav-item">
                            <a className="nav-link" href="#">Вход</a>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Layout;
