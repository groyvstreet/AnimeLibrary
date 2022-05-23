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
                value={filter.genre}
                options={genres}
                onChanged={selectedGenre => setFilter({...filter, genre: selectedGenre})}
            />
        </div>
    )
}

export default AnimesFilter
