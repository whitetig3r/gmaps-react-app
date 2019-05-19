export const initAutoComplete = (mapRef, namer) => {
  let autocomplete = new window.google.maps.places.Autocomplete(
    document.getElementById(`autoComplete${namer}Input`)
  )

  autocomplete.bindTo('bounds', mapRef)

  autocomplete.setFields(['address_components', 'geometry', 'icon', 'name'])

  return autocomplete
}

export const autoCompleteListener = (parentRef, DOMRef, type) => {
  let place = DOMRef.getPlace()
  if (!place.geometry) {
    window.alert("No details available for input: '" + place.name + "'")
    return
  } else {
    if (type !== 'waypoint') {
      parentRef.updateMarkers(place.geometry.location, type)
    } else {
      parentRef.addWayPoint(place.geometry)
    }
  }
}

export const loadScript = url => {
  const index = window.document.getElementsByTagName('script')[0]
  const script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}
