const SortSelect = ({options, value, onChanged}) => {
    return (
        <select className="form-control" value={value} onChange={event => onChanged(event.target.value)}>
            {options.map((option) =>
                <option value={option.value} key={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    )
}

export default SortSelect
