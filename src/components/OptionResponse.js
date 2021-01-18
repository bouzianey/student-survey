import React, { useState } from "react";
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
        <tr key={i} >
            <td><h6>{option.content}</h6></td>
            <td>
                <input className="" type="radio" id="1" name={i+n} value="1" onChange={handleOptionResponseChange}/>
            </td>
            <td>
                <input className="" type="radio" id="2" name={i+n} value="2" onChange={handleOptionResponseChange}/>
            </td>
            <td>
                <input className="" type="radio" id="3" name={i+n} value="3" onChange={handleOptionResponseChange}/>
            </td>
            <td>
                <input className="" type="radio" id="4" name={i+n} value="4" onChange={handleOptionResponseChange}/>
            </td>
            <td>
                <input className="" type="radio" id="5" name={i+n} value="5" onChange={handleOptionResponseChange}/>
            </td>
        </tr>
  );
};

OptionComponent.propTypes = {
    idx: PropTypes.number,
    option: PropTypes.object,
    handleOptionResponseChange: PropTypes.func,
};

export default OptionComponent;