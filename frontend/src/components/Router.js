import {Navigate, Route, Routes} from "react-router-dom";
import Animes from "../pages/Animes";
import Anime from "../pages/Anime";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Users from "../pages/Users";

const Router = () => {
    return (
        <div className="App-header">
            <Routes>
                <Route path="*" element={<Navigate to="/"/>}>
                </Route>
                <Route path="/" element={<h1>HOME</h1>}>
                </Route>
                <Route path="/animes" element={<Animes/>}>
                </Route>
                <Route path="/animes/:id" element={<Anime/>}>
                </Route>
                <Route path="/users" element={<Users/>}>
                </Route>
                <Route path="/login" element={<Login/>}>
                </Route>
                <Route path="/signup" element={<Signup/>}>
                </Route>
                <Route path="/:slug" element={<Profile/>}>
                </Route>
            </Routes>
        </div>
    )
}

export default Router
