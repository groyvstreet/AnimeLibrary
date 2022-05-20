import SortSelect from "./SortSelect";

const AnimesFilter = ({filter, setFilter}) => {
    return (
        <div>
            <input
                className="form-control"
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
        </div>
    )
}

export default AnimesFilter
