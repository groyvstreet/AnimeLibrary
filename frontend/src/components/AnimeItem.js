import React from "react";
import logo from '../logo.svg'
import {useNavigate} from "react-router-dom";

const AnimeItem = ({anime}) => {
    const navigate = useNavigate();

    return (
        <div className="col-sm-3">
            <div className="card mb-2 anime-card" onClick={() => navigate(`/animes/${anime.id}`)}>
                <img className="card-img-top"
                     src="https://dere.shikimori.one/system/animes/original/5114.jpg?1644323535" alt=""/>
                <div className="card-header">
                    <div>
                        <strong className="text-success">{anime.title}</strong>
                    </div>
                    <div style={{fontSize: '12px'}}>{anime.date.slice(0, 4)}</div>
                    <div style={{fontSize: '12px'}}>Рейтинг: {anime.rating}</div>
                </div>
            </div>
        </div>
    )
}

export default AnimeItem
