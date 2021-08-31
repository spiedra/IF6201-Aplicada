import React from "react";
import './Title.css';

const Tittle = ({ text }) => {
  return (
    <div className="container-title">
      <h1 className="container-title__text">{text}</h1>
    </div>
  );
};

export default Tittle;
