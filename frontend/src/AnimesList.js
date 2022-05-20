import axios from "axios";
import {useState} from "react";
import AnimeItem from "./components/AnimeItem";

function AnimesList({animes}) {
    if (!animes.length) {
        return (
            <h1>
                Список пуст
            </h1>
        )
    }

    return (
        <div>
            <h1>Аниме</h1>
            {animes.map((anime) =>
                <AnimeItem anime={anime} key={anime.id}/>
            )}
        </div>
    );
}

export default AnimesList
