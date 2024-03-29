import '../App.css';
import {useEffect, useMemo, useState} from "react";
import {useLoading} from "../hooks/useLoading";
import AnimesService from "../API/AnimesService";
import AnimesFilter from "../components/AnimesFilter";
import AnimesList from "../components/AnimesList";
import Loader from "../components/Loader";
import GenresService from "../API/GenresService";
import StatusesService from "../API/StatusesService";

function Animes() {
    const [animes, setAnimes] = useState([])
    const [genres, setGenres] = useState([])
    const [statuses, setStatuses] = useState([])
    const [filter, setFilter] = useState({sort: 'average_rating', query: '', genre: '', status: ''})

    const [loadAnimes, isAnimesLoading] = useLoading(async () => {
        const animes = await AnimesService.get(filter.genre, filter.status)
        setAnimes(animes)
    })

    const [loadGenres, isGenresLoading] = useLoading(async () => {
        const genres = await GenresService.getAll()
        setGenres(genres)
    })

    const [loadStatuses, isStatusesLoading] = useLoading(async () => {
        const statuses = await StatusesService.getAll()
        setStatuses(statuses)
    })

    useEffect(() => {
        loadAnimes()
        loadGenres()
        loadStatuses()
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
                    <AnimesFilter filter={filter} setFilter={setFilter} genres={genres} statuses={statuses}/>
                </div>
            </div>
        </div>
    );
}

export default Animes;
