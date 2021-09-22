import React from "react";
import "./Button.css";

const Button = ({ text, handleSubmit, icon }) => {
  return (
    <div className="container-button">
      <button type="button" className="btn container-button__btn btn-dark" onClick={handleSubmit}>
        <img src={icon} alt={text}/>
      </button>
    </div>
  );
};

export default Button;