import React, {useEffect, useState} from "react";
import UsersService from "../API/UsersService";
import {Link} from "react-router-dom";

const CommentItem = ({comment}) => {
    const [username, setUsername] = useState('')

    useEffect(() => {
        UsersService.getById(comment.user)
            .then(response => {
                return response.json()
            })
            .then((data) => {
                setUsername(data.username)
            })
    }, [])

    return (
        <div>
            <hr/>
            <p><strong>Время:</strong> {new Date(comment.date).toLocaleString()}</p>
            <p><Link to={'/' + username}><strong>{username}</strong></Link></p>
            <p>{comment.text}</p>
        </div>
    )
}

export default CommentItem
