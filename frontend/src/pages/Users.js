import {useEffect, useState} from "react";
import {useLoading} from "../hooks/useLoading";
import UsersService from "../API/UsersService";
import Loader from "../components/Loader";
import UserItem from "../components/UserItem";
import React from "react";
import {useMemo} from "react";

function Users() {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState({query: ''})

    const [loadUsers, isUsersLoading] = useLoading(async () => {
        const users = await UsersService.getAll()
        setUsers(users)
    })

    const searchedUsers = useMemo(() => {
        return users.filter((user) => user.username.toLowerCase().includes(filter.query))
    }, [filter.query, users])

    useEffect(() => {
        loadUsers()
    }, [])

    return (
        <div className="container">
            <h1>Пользователи</h1>
            {isUsersLoading
                ?
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Loader/>
                </div>
                :
                <div>
                    <input
                        className="form-control mt-2 mb-4 is-valid"
                        placeholder="Поиск"
                        value={filter.query}
                        onChange={e => setFilter({...filter, query: e.target.value})}
                    />
                    {searchedUsers.length
                        ?
                        <div className="row">
                            {
                                searchedUsers.map((user) =>
                                    <UserItem user={user} key={user.id}/>
                                )
                            }
                        </div>
                        :
                        <div>
                            <h5>
                                Не найдено
                            </h5>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img src="https://vkclub.su/_data/stickers/persik/sticker_vk_persik_017.png" alt=""/>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Users
