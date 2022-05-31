const SortSelect = ({options, value, onChanged}) => {
    return (
        <select className="form-control mb-2 is-valid" value={value} onChange={event => onChanged(event.target.value)}>
            {options.map((option) =>
                <option value={option.value} key={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    )
}

export default SortSelect
