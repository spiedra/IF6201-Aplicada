import React from 'react';
import './Input.css';

const Input = ({attribute, handleChange, param}) =>{
    return(
        <div className="container-input--login mx-3">
            <input
            id={attribute.id}
            name={attribute.name}
            placeholder={attribute.placeholder}
            type={attribute.type}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className='form-control'
            />
        </div>
    )
}

export default Input;