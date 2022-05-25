import SortSelect from "./SortSelect";
import logo from "../logo.svg";
import React from "react";
import SortCheckBoxSelect from "./SortCheckBoxSelect";

const AnimesFilter = ({filter, setFilter, genres}) => {
    return (
        <div>
            <input
                className="form-control mb-2"
                placeholder="Поиск"
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
            />
            <SortSelect
                value={filter.sort}
                onChanged={selectedSort => setFilter({...filter, sort: selectedSort})}
                options={[
                    {value: 'rating', name: 'По рейтингу'},
                    {value: 'date', name: 'По году'},
                ]}
            />
            <SortCheckBoxSelect
                name="Жанр"
                value={filter.genre}
                options={genres}
                onChanged={(selectedGenres) => setFilter({...filter, genre: selectedGenres})}
            />
            <SortCheckBoxSelect
                name="Статус"
                value={filter.status}
                options={[{id: 1, name: 'i'}, {id: 2, name: 'o'}]}
                onChanged={(selectedStatus) => setFilter({...filter, status: selectedStatus})}
            />
        </div>
    )
}

export default AnimesFilter
