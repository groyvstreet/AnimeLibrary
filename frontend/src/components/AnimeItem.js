import React from "react";
import {useNavigate} from "react-router-dom";

const AnimeItem = ({anime}) => {
    const navigate = useNavigate();

    return (
        <div className="col-sm-3">
            <div className="card mb-2 anime-card" onClick={() => navigate(`/animes/${anime.id}`)}>
                <img className="card-img-top" src={anime.image} style={{height: '230px'}} alt=""/>
                <div className="card-header">
                    <div>
                        <strong className="text-success">{anime.title}</strong>
                    </div>
                    <div style={{fontSize: '12px'}}>{anime.date.slice(0, 4)}</div>
                    <div style={{fontSize: '12px'}}>Рейтинг: {anime.average_rating}</div>
                </div>
            </div>
        </div>
    )
}

export default AnimeItem
