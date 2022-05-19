import './App.css';
import Layout from './Layout'
import AnimesList from "./AnimesList";
import {useState} from "react";
import SortSelect from "./components/SortSelect";

function App() {
    const [animes, setAnimes] = useState([
        {id: 1, title: 'Naruto', date: 'b', rating: 'a'},
        {id: 2, title: 'Boruto', date: 'a', rating: 'b'},
    ])

    const [selectedSort, setSelectedSort] = useState('')

    const sortAnimes = (sort) => {
        setSelectedSort(sort);
        const newAnime = {
            id: Date.now(),
            title: 'Test',
            date: 'Test',
            rating: 'Test',
        }
        setAnimes([...animes].sort((a, b) => a[sort].localeCompare(b[sort])))
    }

    return (
        <div className="App">
            <Layout/>
            <div>
                <SortSelect
                    value={selectedSort}
                    onChanged={sortAnimes}
                    options={[
                        {value: 'rating', name: 'По рейтингу'},
                        {value: 'date', name: 'По году'},
                    ]}
                />
            </div>
            {animes.length !== 0
                ?
                <AnimesList animes={animes}/>
                :
                <h1>
                    Список пуст
                </h1>
            }
        </div>
    );
}

export default App;
