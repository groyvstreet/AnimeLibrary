import './App.css';
import Layout from './Layout'
import AnimesList from "./AnimesList";
import {useEffect, useMemo, useState} from "react";
import SortSelect from "./components/SortSelect";
import AnimesFilter from "./components/AnimesFilter";
import axios from "axios";
import AnimesService from "./API/AnimesService";
import logo from "./logo.svg"
import {useLoading} from "./hooks/useLoading";

function App() {
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
            <Layout/>
            <AnimesFilter filter={filter} setFilter={setFilter}/>
            {isAnimesLoading
                ?
                <div>
                    <img className="App-logo" src={logo} alt=""/>
                    <h2>Загрузка...</h2>
                </div>
                : <AnimesList animes={sortedAndSearchedAnimes}/>
            }
        </div>
    );
}

export default App;
