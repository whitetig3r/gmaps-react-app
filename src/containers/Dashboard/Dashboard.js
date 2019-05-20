import React, { Component } from 'react'
import { MAPS_API_KEY } from '../../lib/Maps_API_Creds'
import {
  initAutoComplete,
  loadScript,
  autoCompleteListener,
} from '../../utils/maps_utils'
import { MAP_STYLES } from './map_styles'
import SourceDestination from '../SourceDestination/SourceDestination'
import WayPointPanel from '../WayPointPanel/WayPointPanel'
import './Dashboard.css'

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      activeLocType: 'Source',
      directionsVisible: false,
      source: { lat: 13.0827, lng: 80.2707 }, // Just for initial render
      destination: { lat: 13.0827, lng: 80.2707 },
      wayPoints: [],
    }
  }

  componentDidMount() {
    this.renderMap()
  }

  componentWillUnmount() {
    window.google.maps.event.clearInstanceListeners(this.map)
  }

  calculateAndRenderDirections = () => {
    let request = {
      origin: this.state.source,
      destination: this.state.destination,
      waypoints: this.state.wayPoints.map(wayPoint => ({
        location: wayPoint.location,
        stopover: true,
      })),
      optimizeWaypoints: true,
      travelMode: 'DRIVING',
    }
    this.setState(
      {
        directionsVisible: true,
      },
      () => {
        this.directionsDisplay.setMap(this.map)
        this.directionsDisplay.setPanel(document.getElementById('right_panel'))
        this.directionsService.route(request, (res, stat) => {
          if (stat === 'OK') {
            this.directionsDisplay.setDirections(res)
          }
        })
      }
    )
  }

  bindAutoCompleteListeners = (DOMRef, type = 'waypoint') => {
    const parentRef = this
    DOMRef.addListener(
      'place_changed',
      autoCompleteListener.bind(this, parentRef, DOMRef, type),
      { passive: true }
    )
  }

  updateMarkers = (latLng, locType) => {
    this.setState(
      {
        activeLocType: locType,
        [locType]: latLng,
      },
      this.initMap
    )
  }

  addWayPointAutoComplete = WayPointIndex => {
    const autocomplete_waypoint = initAutoComplete(
      this.map,
      `WayPoint${WayPointIndex}`
    )
    this.bindAutoCompleteListeners(autocomplete_waypoint)
  }

  addWayPoint = wayPoint => {
    let wayPoints = this.state.wayPoints
    wayPoints.push(wayPoint)
    this.setState({
      wayPoints,
    })
  }

  resetWayPoints = () => {
    this.setState(
      {
        wayPoints: [],
      },
      () => {
        this.calculateAndRenderDirections()
      }
    )
  }

  renderMap = () => {
    // add this script tag so that React has access to the library
    // NOTE: adding the script tag to index.html will prove useless given the requirements
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places&callback=initMap`
    )
    window.initMap = this.initMap
  }

  initMap = () => {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center:
        this.state.activeLocType === 'source'
          ? this.state.source
          : this.state.destination,
      zoom: 15,
      styles: MAP_STYLES,
    })

    this.directionsService = new window.google.maps.DirectionsService()
    this.directionsDisplay = new window.google.maps.DirectionsRenderer()

    const autocomplete_source = initAutoComplete(this.map, 'Source')
    const autocomplete_destination = initAutoComplete(this.map, 'Destination')

    this.bindAutoCompleteListeners(autocomplete_source, 'source')
    this.bindAutoCompleteListeners(autocomplete_destination, 'destination')
  }

  render() {
    // using inline styles here owing to conditional nature of styles
    return (
      <main id="wrapper">
        <SourceDestination
          calculateAndRenderDirections={this.calculateAndRenderDirections}
        />
        <div id="inner_wrapper">
          <WayPointPanel
            addWayPointAutoComplete={this.addWayPointAutoComplete}
            resetWayPoints={this.resetWayPoints}
          />
          <div id="map" />
          <div
            style={
              this.state.directionsVisible
                ? { height: '100%' }
                : { display: 'inline-block' }
            }
            id="right_panel"
          >
            {!this.state.directionsVisible ? (
              <div id="instruction_for_panel">
                Your Directions will appear here!
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
