import React from 'react';
import LocationInputField from '../../components/LocationInputField/LocationInputField';
import './SourceDestination.css';

export default function SourceDestination(props) {
    return (
        <div className="location_container">
            <LocationInputField name="Source"/>
            <LocationInputField name="Destination"/>
            <button id="getDir_button" onClick={() => props.calculateAndRenderDirections()}>
                GET DIRECTIONS
            </button>
        </div>
    );
}


