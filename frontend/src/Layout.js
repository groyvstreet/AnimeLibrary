import logo from "./logo.svg";
import {Link} from "react-router-dom";

function Layout() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
            <a className="navbar-brand" href="#">
                <img className="App-logo" src={logo} alt=""/>
                Kraken
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Главная</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/animes">Аниме</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">Пользователи</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {/*{% if user.is_authenticated %}
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{user.get_username}}
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Профиль</a>
                            <a className="dropdown-item" href="#">Личный список</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="?next={{ request.path }}">Выход</a>
                        </div>
                    </li>
                    {% else %}
                    <li className="nav-item">
                        <a className="nav-link" href="">Регистрация</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">Вход</a>
                    </li>
                    {% endif %}*/}
                </ul>
            </div>
        </nav>
    );
}

export default Layout;
