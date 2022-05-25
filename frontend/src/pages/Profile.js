import React, {useEffect, useState} from "react";
import {useContext} from "react";
import {AuthContext} from "../context";
import UsersService from "../API/UsersService";
import {useLoading} from "../hooks/useLoading";
import AnimesService from "../API/AnimesService";
import Loader from "../components/Loader";

function Profile() {
    const {isAuth, user} = useContext(AuthContext)
    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [initFirstName, setInitFirstName] = useState(user.first_name)
    const [initLastName, setInitLastName] = useState(user.last_name)
    const [isDisable, setIsDisable] = useState(true)
    const username = window.location.pathname.slice(1)
    const [profileUser, setProfileUser] = useState({})

    const [loadProfile, isProfileLoading] = useLoading(async () => {
        const users = await UsersService.getAll(window.location.pathname.slice(1))
        const user = users.filter((user) => user.username == username)[0]
        setProfileUser(user)
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setInitFirstName(user.first_name)
        setInitLastName(user.last_name)
    })

    useEffect( () => {
        loadProfile()
    }, [])

    useEffect(() => {
        if (firstName !== initFirstName || lastName !== initLastName) {
            setIsDisable(false)
        } else {
            setIsDisable(true)
        }
    }, [firstName, lastName])

    const update = (e) => {
        e.preventDefault()
        UsersService.update(user.id, {
            username: user.username,
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
                        <div className="card text-center mt-5" style={{borderRadius: '30px'}}>
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
                                    {isAuth && username === user.username
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
                            {isAuth && username === user.username
                                ?
                                <div className="card-footer bg-transparent">
                                    <form>
                                        {isDisable
                                            ?
                                            <button className="btn btn-outline-success" disabled>Сохранить</button>
                                            :
                                            <button className="btn btn-outline-success"
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
        </div>
    )
}

export default Profile
