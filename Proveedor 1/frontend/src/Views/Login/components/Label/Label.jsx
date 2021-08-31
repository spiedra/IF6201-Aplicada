import React from 'react';

const Label = ({text}) => {
    return (
        <div className="container-label">
            <label className="container-label__text">{text}</label>
        </div>
    )
}

export default Label;