import React, { useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import PropTypes from 'prop-types';



const OptionComponent = ({ idx, i,  questionID, option, onOptionChange}) => {

    const [OptionContent, setOptionContent] = useState("");
    let n = idx.toString();
    const handleOptionResponseChange = (e) => {
        const value = e.target.value;
        setOptionContent(value);
        onOptionChange(e, idx, value);

  };
    return (
    <div key={i}>

        <label htmlFor='{optionID}'>{option.content}</label>
        <input type="radio" id="1" name={i+n} value="1" onChange={handleOptionResponseChange}/>
        <input type="radio" id="2" name={i+n} value="2" onChange={handleOptionResponseChange}/>
        <input type="radio" id="3" name={i+n} value="3" onChange={handleOptionResponseChange}/>
        <input type="radio" id="4" name={i+n} value="4" onChange={handleOptionResponseChange}/>
        <input type="radio" id="5" name={i+n} value="5" onChange={handleOptionResponseChange}/>

    </div>
  );
};

OptionComponent.propTypes = {
    idx: PropTypes.number,
    option: PropTypes.object,
    handleOptionResponseChange: PropTypes.func,
};

export default OptionComponent;