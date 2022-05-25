import {useNavigate} from "react-router-dom";

const UserItem = ({user}) => {
    const navigate = useNavigate();

    return (
        <div className="col-sm-12">
            <div className="card mt-2 user-card" onClick={() => navigate(`/${user.username}`)}>
                <div className="card-body">{user.username}</div>
            </div>
        </div>
    )
}

export default UserItem
