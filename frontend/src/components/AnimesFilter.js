import SortSelect from "./SortSelect";
import logo from "../logo.svg";
import React from "react";
import SortCheckBoxSelect from "./SortCheckBoxSelect";

const AnimesFilter = ({filter, setFilter, genres, statuses}) => {
    return (
        <div>
            <input
                className="form-control mb-2"
                placeholder="Поиск"
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value.toLowerCase()})}
            />
            <SortSelect
                value={filter.sort}
                onChanged={selectedSort => setFilter({...filter, sort: selectedSort})}
                options={[
                    {value: 'average_rating', name: 'По рейтингу'},
                    {value: 'date', name: 'По году'},
                ]}
            />
            <SortCheckBoxSelect
                name="Статус"
                value={filter.status}
                options={statuses}
                onChanged={(selectedStatus) => setFilter({...filter, status: selectedStatus})}
            />
            <SortCheckBoxSelect
                name="Жанр"
                value={filter.genre}
                options={genres}
                onChanged={(selectedGenres) => setFilter({...filter, genre: selectedGenres})}
            />
        </div>
    )
}

export default AnimesFilter
