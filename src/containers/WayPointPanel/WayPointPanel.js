import React, { useState } from 'react'
import './WayPointPanel.css'

export default function WayPointPanel(props) {
  const [wayPointCounter, setWayPointCount] = useState(0) // React Hooks YAY!

  return (
    <div id="waypoint_wrapper">
      <h3 className="waypoint_panel_header">ADD STOPOVERS HERE</h3>
      <h6 className="waypoint_panel_header">
        <em>(hit "Get Directions" after adding a waypoint)</em>
      </h6>
      {[...Array(wayPointCounter).keys()].map(wayPtIndex => {
        return (
          <input
            key={wayPtIndex}
            className="waypoint_field"
            id={`autoCompleteWayPoint${wayPtIndex}Input`}
            type="text"
          />
        )
      })}
      <button
        className="waypoint_add_button"
        onClick={async () => {
          await setWayPointCount(wayPointCounter + 1)
          props.addWayPointAutoComplete(wayPointCounter)
        }}
      >
        ADD WAYPOINT
      </button>
      <button
        className="waypoint_add_button"
        onClick={async () => {
          await setWayPointCount(0)
          props.resetWayPoints()
        }}
      >
        RESET WAYPOINT
      </button>
    </div>
  )
}
