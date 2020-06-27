import * as React from 'react';

export class DisplayMapClass extends React.Component {
  mapRef = React.createRef();

  state = {
    // The map instance to use during cleanup
    map: null
  };

  componentDidMount() {

    let locationNow;
    
    const H = window.H;
    const platform = new H.service.Platform({
        apikey: "-5_JlpUxRxxJW-pE4YPyEmehgzTyN4hUdsXUfhp3QJU"
    });

    const defaultLayers = platform.createDefaultLayers();

    // Create an instance of the map
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: locationNow ? {lat:locationNow.latitude,lng:locationNow.longitude}:{ lat: 45.4970741, lng: -73.4703679 },
        zoom: 10,
        pixelRatio: window.devicePixelRatio || 1
      }
    );
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    console.log(behavior);
    const ui = H.ui.UI.createDefault(map, defaultLayers);
    console.log(ui);

    if("geolocation" in navigator)
    {
        //console.log("Geolocation avaible");
        navigator.geolocation.getCurrentPosition(function(position) {
            //console.log("Latitude is :", position.coords.latitude);
            //console.log("Longitude is :", position.coords.longitude);
            locationNow = position;
            var currentPositionPngIcon = new H.map.Icon(require("./images/icon_gps_position.png"), {size: {w: 56, h: 56}});
            var currentPositionMarker = new H.map.Marker({lat:locationNow.coords.latitude,lng:locationNow.coords.longitude},{icon: currentPositionPngIcon});
            map.addObject(currentPositionMarker);
            map.setCenter({lat:locationNow.coords.latitude,lng:locationNow.coords.longitude});
            map.setZoom(14);
        });
    }else{
        console.log("Geolocation not avaible");
        alert("Your browser do not support geolocation, the application will not work.");
    }
    
    this.setState({ map });

    window.addEventListener('resize', function(e){
        map.getViewPort().resize();
        map.setCenter({lat:locationNow.coords.latitude,lng:locationNow.coords.longitude});
        map.setZoom(15);
    });
  }

  componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    this.state.map.dispose();
  }

  render() {
    return (
      // Set a height on the map so it will display
      <div ref={this.mapRef} style={{ height: "500px" }} />
    );
  }
}