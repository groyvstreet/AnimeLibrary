import React from "react";

const AnimeItem = ({anime}) => {
    return (
        <div className="card">
            <div className="card-header">
                <a href="#">
                    <strong className="text-success">{anime.title}</strong>
                </a>
            </div>
        </div>
    )
}

export default AnimeItem
