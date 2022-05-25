import React from "react";

const SortCheckBoxSelect = ({name, options, value, onChanged}) => {
    return (
        <div className="card mb-2">
            <div className="card-header">
                <strong className="text-success">{name}</strong>
            </div>
            <div className="card-body">
                {options.map((option) =>
                    <div className="form-check" key={option.id}>
                        <input type="checkbox" className="form-check-input" onChange={
                            event => onChanged(event.target.checked ? value + ',' + option.name : value.replace(',' + option.name, ''))}/>
                        <label className="form-check-label">{option.name}</label>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SortCheckBoxSelect
