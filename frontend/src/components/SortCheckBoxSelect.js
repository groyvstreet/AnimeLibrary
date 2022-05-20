import React from "react";

const SortCheckBoxSelect = ({options, value, onChanged}) => {
    return (
        <div className="card">
            <div className="card-header">
                <strong className="text-success">Жанр</strong>
            </div>
            <div className="card-body">
                {options.map((option) =>
                    <div className="form-check" key={option.id}>
                        <input type="checkbox" className="form-check-input" onChange={
                            event => onChanged(event.target.value ? option.id : '')}/>
                        <label className="form-check-label">{option.name}</label>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SortCheckBoxSelect
