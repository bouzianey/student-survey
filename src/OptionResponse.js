import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import PropTypes from 'prop-types';



const OptionComponent = ({optionID , option}) => {

    return (
    <div key={`{option.label}`}>
        <label htmlFor='{optionID}'>{option.content}</label>
        <input type="radio" id="1" name="option" value="1"/>
        <input type="radio" id="2" name="option" value="2"/>
        <input type="radio" id="3" name="option" value="3"/>
        <input type="radio" id="4" name="option" value="4"/>
        <input type="radio" id="5" name="option" value="5"/>

    </div>
  );
};

OptionComponent.propTypes = {
    idx: PropTypes.number,
    option: PropTypes.object,
    handleOptionChange: PropTypes.func,
};

export default OptionComponent;