import {Navigate, Route, Routes} from "react-router-dom";
import Animes from "../pages/Animes";
import Anime from "../pages/Anime";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Users from "../pages/Users";
import {privateRoutes, publicRoutes} from "../router";
import {useContext} from "react";
import {AuthContext} from "../context";

const Router = () => {
    const {isAuth} = useContext(AuthContext)
    return (
        <div className="App-header">
            {isAuth
                ?
                <Routes>
                    <Route path="*" element={<Navigate to="/animes"/>}></Route>
                    {privateRoutes.map((route) =>
                        <Route path={route.path} element={route.component} exact={route.exact}></Route>
                    )}
                </Routes>
                :
                <Routes>
                    <Route path="*" element={<Navigate to="/animes"/>}></Route>
                    {publicRoutes.map((route) =>
                        <Route path={route.path} element={route.component} exact={route.exact}></Route>
                    )}
                </Routes>
            }
        </div>
    )
}

export default Router
