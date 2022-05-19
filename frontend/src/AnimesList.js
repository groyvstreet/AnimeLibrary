import axios from "axios";
import {useState} from "react";
import AnimeItem from "./components/AnimeItem";

function AnimesList({animes}) {
    async function animesList() {
        const response = await axios.get('http://127.0.0.1:8000/api/animes/')
        console.log(response.data)
    }

    return (
        <div>
            <button onClick={animesList}>GET</button>
            <h1>Аниме</h1>
            {animes.map((anime) =>
                <AnimeItem anime={anime} key={anime.id}/>
            )}
        </div>
    );
}

export default AnimesList
