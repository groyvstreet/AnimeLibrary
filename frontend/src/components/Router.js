import {Navigate, Route, Routes} from "react-router-dom";
import Animes from "../pages/Animes";
import Anime from "../pages/Anime";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="*" element={<Navigate to="/"/>}>
                </Route>
                <Route path="/" element={<h1>HOME</h1>}>
                </Route>
                <Route path="/animes" element={<Animes/>}>
                </Route>
                <Route path="/animes/:id" element={<Anime/>}>
                </Route>
                <Route path="/about" element={<h1>ABOUT</h1>}>
                </Route>
                <Route path="/login" element={<Login/>}>
                </Route>
                <Route path="/signup" element={<Signup/>}>
                </Route>
            </Routes>
        </div>
    )
}

export default Router
