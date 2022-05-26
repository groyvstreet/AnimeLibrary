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
    const [filter, setFilter] = useState({sort: 'average_rating', query: '', genre: '', status: ''})

    const [loadAnimes, isAnimesLoading] = useLoading(async () => {
        const animes = await AnimesService.get(filter.genre, filter.status)
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

    useEffect(() => {
        loadAnimes()
    }, [filter.genre, filter.status])

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
                        ?
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Loader/>
                        </div>
                        :
                        <AnimesList animes={sortedAndSearchedAnimes}/>
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
