import React from 'react';

const Label = ({text}) => {
    return (
        <div className="container-label mx-3 my-1">
            <label className="container-label__text fs-5">{text}</label>
        </div>
    )
}

export default Label;