import {useNavigate} from "react-router-dom";

const AnimeTile = ({anime}) => {
    const navigate = useNavigate();

    return (
        <div className="card mb-2 user-card" onClick={() => navigate(`/animes/${anime.id}`)}>
            <div className="card-body">{anime.title}</div>
        </div>
    )
}

export default AnimeTile
