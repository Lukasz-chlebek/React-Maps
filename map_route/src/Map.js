import React from 'react';
import H from "@here/maps-api-for-javascript";
import onResize from 'simple-element-resize-detector';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        // the reference to the container
        this.ref = React.createRef();
        // reference to the map
        this.map = null;
    }

    componentDidMount() {
        if (!this.map) {
            const routingParameters = {
                'routingMode': 'fast',
                'transportMode': 'car',
                // The start point of the route:
                'origin': this.props.coord.pointACoord,
                // The end point of the route:
                'destination': this.props.coord.pointBCoord,
                // Include the route shape in the response
                'return': 'polyline'
            };
            // instantiate a platform, default layers and a map as usual
            const platform = new H.service.Platform({
                apikey: 'ZqHI-mJG9L4fEibpuqHBlpvi2ju4FNxBGf-RNe-l1FM'
            });
            var service = platform.getOMVService({path:  'v2/vectortiles/core/mc'});
            // create a provider and a layer that use the custom service and a custom style
            var provider = new H.service.omv.Provider(service,
                new H.map.Style('https://js.api.here.com/v3/3.1/styles/omv/oslo/japan/normal.day.yaml'));
            var layer = new H.map.layer.TileLayer(provider, {max: 22});

            const map = new H.Map(
                this.ref.current,
                layer,
                {
                    pixelRatio: window.devicePixelRatio,
                    center: {lat: 0, lng: 0},
                    zoom: 0,
                },


            );
            const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

            onResize(this.ref.current, () => {
                map.getViewPort().resize();
            });
            this.map = map;
            const onResult = function(result) {
                // ensure that at least one route was found
                if (result.routes.length) {
                    result.routes[0].sections.forEach((section) => {
                        // Create a linestring to use as a point source for the route line
                        let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

                        // Create a polyline to display the route:
                        let routeLine = new H.map.Polyline(linestring, {
                            style: { strokeColor: 'blue', lineWidth: 3 }
                        });

                        // Create a marker for the start point:
                        let startMarker = new H.map.Marker(section.departure.place.location);

                        // Create a marker for the end point:
                        let endMarker = new H.map.Marker(section.arrival.place.location);

                        // Add the route polyline and the two markers to the map:
                        map.addObjects([routeLine, startMarker, endMarker]);

                        // Set the map's viewport to make the whole route visible:
                        map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});

                    });
                }
            };
            const router = platform.getRoutingService(null, 8);
            this.map = router.calculateRoute(routingParameters, onResult,
                function(error) {
                    alert(error.message);
                });
            var ui = new H.ui.UI.createDefault(map, layer)
            //ui.getControl("mapsettings").setVisibility(false)

        }

    }

    render() {
        return (
            <div
                style={{ position: 'relative', width: '600px', height:'600px' }}
                ref={this.ref}
            />
        )
    }
}
