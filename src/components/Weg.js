import React, { Component } from 'react';
import Openrouteservice from 'openrouteservice-js';
import rootJSX from '../pages/root'

var directionCoordinates= [];

class Weg extends Component {

    constructor(testWeg) {
        super(testWeg);

        this.calcRoute = this.calcRoute.bind(this);
    }

	//change Lonitude and Latitude, since thew are given back in the wrong order
    changeLongLat(){
        for (var i=0; i < directionCoordinates.length; i++) {
            var x = directionCoordinates[i][0];
            directionCoordinates[i][0] = directionCoordinates[i][1];
            directionCoordinates[i][1] =  x;
        }
    }
    calcRoute(startLatitude, startLongitude, endLatitude, endLongitude) {
        
       //-------------------------------------------------------------------
       // Calc navigation instructions.
        var Directions = new Openrouteservice.Directions({
            api_key: "5b3ce3597851110001cf6248325551c86d55441f8d7e5d496d06a201"
        });
        Directions.calculate({
            coordinates: [[startLongitude, startLatitude], [endLongitude, endLatitude]],
            profile: "driving-car",
            extra_info: ["waytype", "steepness"],
            format: "json",
            api_version: 'v2',
        })
		//Extract the important information from the JSON
            .then(function (json) {
                let apiresponse = JSON.stringify(json, null, "\t")
                var obj = JSON.parse(apiresponse);
                var arrayLen = Object.keys(obj.routes[0].segments[0].steps).length;
                var response = "";
                for (var i = 0; i < arrayLen; i++) {
                    response = response + "<p> In " + obj.routes[0].segments[0].steps[i].distance + 'm ' + obj.routes[0].segments[0].steps[i].instruction+ "." + "</p>";
                }
                document.getElementById("rootBlock").innerHTML=response;
            })
            .catch(function (err) {
                let response = JSON.stringify(err, null, "\t")
                //console.error(response);
            });
            //-------------------------------------------------------------------
            // Need more points to calculte a fluent polygon line.
            // First request doesn't povide enough for this purpose.
            var url = "https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248325551c86d55441f8d7e5d496d06a201&start="+ startLongitude + "," + startLatitude +"&end="+ endLongitude +","+ endLatitude +""
        return fetch(url)
            .then(response => response.json())
			.then((jsonData) => {
				try{
                directionCoordinates = jsonData.features[0].geometry.coordinates;
				}catch{
					window.alert("Route could not be calculated!");
					return null;
				}
			    this.changeLongLat();
			    return directionCoordinates;
			});
    }
}
export default Weg;