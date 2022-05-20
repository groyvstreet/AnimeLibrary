import {Navigate, Route, Routes} from "react-router-dom";
import Animes from "../pages/Animes";

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
                <Route path="/about" element={<h1>ABOUT</h1>}>
                </Route>
            </Routes>
        </div>
    )
}

export default Router
