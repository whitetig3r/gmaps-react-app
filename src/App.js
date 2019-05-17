import React, { Component } from 'react';
import SourceDestination from './containers/SourceDestination/SourceDestination';
import WayPointPanel from './containers/WayPointPanel/WayPointPanel';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeLocType: "Source",
      source: { lat: -34.397, lng: 150.644 },
      destination: { lat: -34.397, lng: 150.644 },
      wayPoints: []
    }
  }

  componentDidMount() {
    this.renderMap()
  }

  calculateAndRenderDirections = () => {
    let directionsService = new window.google.maps.DirectionsService(),
    directionsDisplay = new window.google.maps.DirectionsRenderer(),
    request = {
      origin: this.state.source,
      destination: this.state.destination,
      waypoints: this.state.wayPoints.map( wayPoint => ({
          location: wayPoint.location,
          stopover: true
      }) ),
      optimizeWaypoints: true,
      travelMode: "DRIVING"
    }
    directionsDisplay.setMap(this.map);
    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(document.getElementById('right-panel'));
    directionsService.route(request, (res,stat) => {
      if (stat === "OK"){
        directionsDisplay.setDirections(res)
      }
    })
  }

  updateMarkers = (latLng,locType) => {
    this.setState({
      activeLocType: locType,
      [locType]: latLng
    },this.initMap)
  }

  initAutoComplete = () => {
    let autocomplete_source = new window.google.maps.places.Autocomplete(document.getElementById("autoCompleteSourceInput"));

    autocomplete_source.bindTo("bounds", this.map);

    autocomplete_source.setFields(
      ['address_components', 'geometry', 'icon', 'name']);

    autocomplete_source.addListener('place_changed', () => {
      var place = autocomplete_source.getPlace();
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      } else {
        this.updateMarkers(place.geometry.location, "source")
      }
    })

    let autocomplete_destination = new window.google.maps.places.Autocomplete(document.getElementById("autoCompleteDestinationInput"));

    autocomplete_destination.bindTo("bounds", this.map);

    autocomplete_destination.setFields(
      ['address_components', 'geometry', 'icon', 'name']);

    autocomplete_destination.addListener('place_changed', () => {
      var place = autocomplete_destination.getPlace();
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      else {
        this.updateMarkers(place.geometry.location, "destination")
      }
    })
  }

  addWayPointAutoComplete = (WayPointIndex) => {
    let autocomplete = new window.google.maps.places.Autocomplete(document.getElementById(`autoCompleteWayPoint${WayPointIndex}`));

    autocomplete.bindTo("bounds", this.map);

    autocomplete.setFields(
      ['address_components', 'geometry', 'icon', 'name']);

    autocomplete.addListener('place_changed', () => {
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      else {
        this.addWayPoint(place.geometry);
      }
    })
  }

  addWayPoint = (wayPoint) => {
    let wayPoints = this.state.wayPoints;
    wayPoints.push(wayPoint);
    this.setState({
      wayPoints
    })
  }

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAfUGhSG2bd6fcak2IjQ_TuaLHKLhgE9go&libraries=places&callback=initMap"
    );
    window.initMap = this.initMap
  }

  initMap = () => {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.activeLocType === "source" ? this.state.source : this.state.destination,
      zoom: 17
    });
    this.initAutoComplete();
  }

  render() {
    return (
      <main id="wrapper">
          <SourceDestination calculateAndRenderDirections={this.calculateAndRenderDirections} />
          <div id="inner_wrapper">
            <WayPointPanel addWayPointAutoComplete={this.addWayPointAutoComplete} />
            <div id="map"></div>
            <div id="right-panel"></div>
          </div>
      </main>
    );
  }
}

function loadScript(url) {
  const index = window.document.getElementsByTagName("script")[0]
  const script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index);
}

export default App;
