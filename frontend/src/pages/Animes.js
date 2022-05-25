import '../App.css';
import {useEffect, useMemo, useState} from "react";
import logo from "../logo.svg"
import {useLoading} from "../hooks/useLoading";
import AnimesService from "../API/AnimesService";
import Layout from "../Layout";
import AnimesFilter from "../components/AnimesFilter";
import AnimesList from "../AnimesList";
import Loader from "../components/Loader";
import AnimeItem from "../components/AnimeItem";
import GenresService from "../API/GenresService";

function Animes() {
    const [animes, setAnimes] = useState([])
    const [genres, setGenres] = useState([])
    const [filter, setFilter] = useState({sort: 'rating', query: '', genre: []})

    const [loadAnimes, isAnimesLoading] = useLoading(async () => {
        const animes = await AnimesService.getAll()
        setAnimes(animes)
    })

    const [loadGenres, isGenresLoading] = useLoading(async () => {
        const genres = await GenresService.getAll()
        setGenres(genres)
    })

    useEffect(() => {
        loadAnimes()
        loadGenres()
    }, [])

    const sortedAnimes = useMemo(() => {
        return [...animes].sort((a, b) =>
            a[filter.sort].toString().localeCompare(b[filter.sort].toString())
        ).reverse()
    }, [filter.sort, animes])

    const sortedAndSearchedAnimes = useMemo(() => {
        return sortedAnimes.filter((anime) => anime.title.toLowerCase().includes(filter.query))
    }, [filter.query, sortedAnimes])

    const animesWithGenres = useMemo(() => {
        return sortedAndSearchedAnimes.filter((anime) => anime.genre.toString().toLowerCase().includes(filter.genre))
    }, [filter.genre, sortedAndSearchedAnimes])

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-sm-offset-1" style={{padding: '0px'}}>
                    <h1>Аниме</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-8 col-sm-offset-1" style={{padding: '0px'}}>
                    {isAnimesLoading
                        ? <Loader/>
                        : <AnimesList animes={animesWithGenres}/>
                    }
                </div>
                <div className="col-sm-4">
                    <AnimesFilter filter={filter} setFilter={setFilter} genres={genres}/>
                </div>
            </div>
        </div>
    );
}

export default Animes;
