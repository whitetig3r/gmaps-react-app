import React, { useState } from 'react';
import './WayPointPanel.css';

export default function WayPointPanel(props) {
    const [wayPointCounter,setWayPointCount] = useState(0); // React Hooks YAY!

    return (
      <div id="waypoint_wrapper">
        <h3 className="waypoint_panel_header">ADD STOPOVERS HERE</h3>
        <h6 className="waypoint_panel_header"><em>(hit "Get Directions" after adding a waypoint)</em></h6>
        {
            [...Array(wayPointCounter).keys()].map(wayPtIndex => {
                return (
                    <input key={wayPtIndex} className="waypoint_field" id={`autoCompleteWayPoint${wayPtIndex}Input`} type="text"/>
                )
            })
        }
        <button id="waypoint_add_button" onClick={() => {
                setWayPointCount(wayPointCounter+1);
                setTimeout(() => props.addWayPointAutoComplete(wayPointCounter),200); // will try to figure a workaround but this is required because comp. not mounted
            }
        }>
            ADD WAYPOINT
        </button>
        <button id="waypoint_add_button" onClick={() => {
                setWayPointCount(0);
                setTimeout(() => props.resetWayPoints(), 200);
            }
        }>
            RESET WAYPOINT
        </button>
      </div>
    );
}