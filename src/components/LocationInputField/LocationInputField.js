import React from 'react';
import './LocationInputField.css';

export default function LocationInputField(props) {
    return(
        <input className="loc_input" id={`autoComplete${props.name}Input`} type="text"
            placeholder={`Enter a ${props.name}`}>
        </input>
    );
}
