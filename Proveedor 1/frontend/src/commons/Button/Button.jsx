import React from "react";
import "./Button.css";

const Button = ({ text, handleSubmit }) => {
  return (
    <div className="container-button">
      <button type="button" className="btn container-button__btn" onClick={handleSubmit}>
        {text}
      </button>
    </div>
  );
};

export default Button;
