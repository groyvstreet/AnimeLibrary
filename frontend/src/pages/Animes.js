import '../App.css';
import {useEffect, useMemo, useState} from "react";
import logo from "../logo.svg"
import {useLoading} from "../hooks/useLoading";
import AnimesService from "../API/AnimesService";
import Layout from "../Layout";
import AnimesFilter from "../components/AnimesFilter";
import AnimesList from "../AnimesList";
import Loader from "../components/Loader";

function Animes() {
    const [animes, setAnimes] = useState([])

    const [filter, setFilter] = useState({sort: 'rating', query: ''})
    const [loadAnimes, isAnimesLoading] = useLoading(async () => {
        const animes = await AnimesService.getAll()
        setAnimes(animes)
    })

    useEffect(() => {
        loadAnimes()
    }, [])

    const sortedAnimes = useMemo(() => {
        return [...animes].sort((a, b) =>
            a[filter.sort].toString().localeCompare(b[filter.sort].toString())
        ).reverse()
    }, [filter.sort, animes])

    const sortedAndSearchedAnimes = useMemo(() => {
        return sortedAnimes.filter((anime) => anime.title.toLowerCase().includes(filter.query))
    }, [filter.query, sortedAnimes])

    return (
        <div className="App">
            <AnimesFilter filter={filter} setFilter={setFilter}/>
            {isAnimesLoading
                ? <Loader/>
                : <AnimesList animes={sortedAndSearchedAnimes}/>
            }
        </div>
    );
}

export default Animes;
