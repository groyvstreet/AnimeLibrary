import React, {useEffect, useState} from "react";
import {useContext} from "react";
import {AuthContext} from "../context";
import UsersService from "../API/UsersService";
import {useLoading} from "../hooks/useLoading";
import AnimesService from "../API/AnimesService";
import Loader from "../components/Loader";
import AnimesFilter from "../components/AnimesFilter";
import GenresService from "../API/GenresService";
import {useMemo} from "react";
import AnimeItem from "../components/AnimeItem";
import AnimeTile from "../components/AnimeTile";
import {isUndefined} from "axios/lib/utils";
import {useParams} from "react-router-dom";
import StatusesService from "../API/StatusesService";

function Profile() {
    const {isAuth, user} = useContext(AuthContext)
    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [initFirstName, setInitFirstName] = useState(user.first_name)
    const [initLastName, setInitLastName] = useState(user.last_name)
    const [isDisable, setIsDisable] = useState(true)
    const [profileUser, setProfileUser] = useState({})
    const [animes, setAnimes] = useState([])
    const [genres, setGenres] = useState([])
    const [statuses, setStatuses] = useState([])
    const [filter, setFilter] = useState({sort: 'average_rating', query: '', genre: '', status: ''})
    const params = useParams()

    const [loadProfile, isProfileLoading] = useLoading(async () => {
        const users = await UsersService.getAll()
        const user = users.filter((user) => user.username == params.slug)[0]
        if (isUndefined(user)) {
            window.location.replace('http://localhost:3000')
        }
        setProfileUser(user)
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setInitFirstName(user.first_name)
        setInitLastName(user.last_name)
    })

    const [loadGenres, isGenresLoading] = useLoading(async () => {
        const genres = await GenresService.getAll()
        setGenres(genres)
    })

    const [loadAnimes, isAnimesLoading] = useLoading(async () => {
        const animes = await AnimesService.get(filter.genre, filter.status, profileUser.username)
        setAnimes(animes)
    })

    const [loadStatuses, isStatusesLoading] = useLoading(async () => {
        const statuses = await StatusesService.getAll()
        setStatuses(statuses)
    })

    const sortedAnimes = useMemo(() => {
        return [...animes].sort((a, b) =>
            a[filter.sort].toString().localeCompare(b[filter.sort].toString())
        ).reverse()
    }, [filter.sort, animes])

    const sortedAndSearchedAnimes = useMemo(() => {
        return sortedAnimes.filter((anime) => anime.title.toLowerCase().includes(filter.query))
    }, [filter.query, sortedAnimes])

    useEffect(() => {
        if (!isUndefined(profileUser.id)) {
            loadAnimes()
        }
    }, [filter.genre, filter.status, profileUser])

    useEffect(() => {
        loadProfile()
        if (!isUndefined(profileUser.id)) {
            loadAnimes()
        }
        loadGenres()
        loadStatuses()
    }, [params])

    useEffect(() => {
        if (firstName !== initFirstName || lastName !== initLastName) {
            setIsDisable(false)
        } else {
            setIsDisable(true)
        }
    }, [firstName, lastName])

    const update = (e) => {
        e.preventDefault()
        UsersService.update({
            first_name: firstName,
            last_name: lastName
        }, localStorage.getItem('token'))
        setInitFirstName(firstName)
        setInitLastName(lastName)
        setIsDisable(true)
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-6">
                    {isProfileLoading
                        ?
                        <Loader/>
                        :
                        <div className="card text-center mt-5 mb-5" style={{borderRadius: '30px'}}>
                            <div className="card-header bg-transparent">
                                <strong className="text-success">
                                    Профиль
                                </strong>
                            </div>
                            <div className="ml-4 mr-4">
                                <div className="card-body">
                                    <div className="row mb-4">Имя пользователя
                                        <input className="form-control" type="text" placeholder={profileUser.username}
                                               readOnly/>
                                    </div>
                                    {isAuth && params.slug === user.username
                                        ?
                                        <div>
                                            <div className="row mb-4">Email
                                                <input className="form-control" type="text" placeholder={user.email}
                                                       readOnly/>
                                            </div>
                                            <div className="row mb-4">Имя
                                                <input className="form-control" type="text" value={firstName}
                                                       onChange={(e) => {
                                                           setFirstName(e.target.value)
                                                       }}/>
                                            </div>
                                            <div className="row">Фамилия
                                                <input className="form-control" type="text" value={lastName}
                                                       onChange={(e) => {
                                                           setLastName(e.target.value)
                                                       }}/>
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <div className="row mb-4">Имя
                                                <input className="form-control" type="text"
                                                       placeholder={profileUser.first_name}
                                                       readOnly/>
                                            </div>
                                            <div className="row mb-4">Фамилия
                                                <input className="form-control" type="text"
                                                       placeholder={profileUser.last_name}
                                                       readOnly/>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            {isAuth && params.slug === user.username
                                ?
                                <div className="card-footer bg-transparent">
                                    <form>
                                        {isDisable
                                            ?
                                            <button className="btn btn-success" disabled>Сохранить</button>
                                            :
                                            <button className="btn btn-success"
                                                    onClick={update}>Сохранить</button>
                                        }
                                    </form>
                                </div>
                                :
                                <div></div>
                            }
                        </div>
                    }
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-sm-12 col-sm-offset-1" style={{padding: '0px'}}>
                    <h1>
                        Аниме
                    </h1>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-8 col-sm-offset-1" style={{padding: '0px'}}>
                    {sortedAndSearchedAnimes.map((anime) =>
                        <AnimeTile anime={anime} key={anime.id}/>
                    )}
                </div>
                <div className="col-sm-4">
                    <AnimesFilter filter={filter} setFilter={setFilter} genres={genres} statuses={statuses}/>
                </div>
            </div>
        </div>
    )
}

export default Profile
