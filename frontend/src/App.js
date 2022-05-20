import './App.css';
import {BrowserRouter} from "react-router-dom";
import Layout from "./Layout";
import Router from "./components/Router";

function App() {

    return (
        <BrowserRouter>
            <Layout/>
            <Router/>
        </BrowserRouter>
    )
}

export default App;
