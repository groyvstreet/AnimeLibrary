import {Navigate} from "react-router-dom";
import Animes from "../pages/Animes";
import Anime from "../pages/Anime";
import Users from "../pages/Users";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";

export const privateRoutes = [
    {path: '/', component: <h1>HOME</h1>, exact: true},
    {path: '/animes', component: <Animes/>, exact: true},
    {path: '/animes/:id', component: <Anime/>, exact: true},
    {path: '/users', component: <Users/>, exact: true},
    {path: '/:slug', component: <Profile/>, exact: true},
]

export const publicRoutes = [
    {path: '/', component: <h1>HOME</h1>, exact: true},
    {path: '/animes', component: <Animes/>, exact: true},
    {path: '/animes/:id', component: <Anime/>, exact: true},
    {path: '/users', component: <Users/>, exact: true},
    {path: '/login', component: <Login/>, exact: true},
    {path: '/signup', component: <Signup/>, exact: true},
    {path: '/:slug', component: <Profile/>, exact: true},
]
