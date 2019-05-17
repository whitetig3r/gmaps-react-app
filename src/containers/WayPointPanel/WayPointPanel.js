import React, { useState } from 'react';
import './WayPointPanel.css';

export default function WayPointPanel(props) {
    const [wayPointCounter,setWayPointCount] = useState(0);
    return (
      <div id="waypoint_wrapper">
        <h3 style={{ textAlign: "center" }}>Add WayPoints Here</h3>
        {
            [...Array(wayPointCounter).keys()].map(wayPtIndex => {
                return (
                    <input key={wayPtIndex} className="wayPointField" id={`autoCompleteWayPoint${wayPtIndex}`} type="text"/>
                )
            })
        }
        <button id="wayPointAddButton" onClick={() => {
                setWayPointCount(wayPointCounter+1)
                setTimeout(() => props.addWayPointAutoComplete(wayPointCounter),1000);
            }
        }>ADD WAYPOINT</button>
      </div>
    );
}