import React from 'react';
import H from "@here/maps-api-for-javascript";
import onResize from 'simple-element-resize-detector';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.map = null;
    }

    componentDidMount() {
        if (!this.map) {
            const routingParameters = {
                'routingMode': 'fast',
                'transportMode': 'car',
                'origin': this.props.props.pointACoord,
                'destination': this.props.props.pointBCoord,
                'return': 'polyline'
            };
            const platform = new H.service.Platform({
                apikey: 'ZqHI-mJG9L4fEibpuqHBlpvi2ju4FNxBGf-RNe-l1FM'
            });
            let service = platform.getOMVService({path: 'v2/vectortiles/core/mc'});
            let provider = new H.service.omv.Provider(service,
                new H.map.Style('https://js.api.here.com/v3/3.1/styles/omv/oslo/japan/normal.day.yaml'));
            let layer = new H.map.layer.TileLayer(provider, {max: 22});

            const map = new H.Map(
                this.ref.current,
                layer,
                {
                    pixelRatio: window.devicePixelRatio,
                    center: {lat: 0, lng: 0},
                    zoom: 0,
                },
            );
            new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
            onResize(this.ref.current, () => {
                map.getViewPort().resize();
            });
            this.map = map;
            const onResult = function(result) {
                if (result.routes.length) {
                    result.routes[0].sections.forEach((section) => {
                        let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

                        let routeLine = new H.map.Polyline(linestring, {
                            style: { strokeColor: '#1EDE00', lineWidth: 3 }
                        });

                        let startMarker = new H.map.Marker(section.departure.place.location);

                        let endMarker = new H.map.Marker(section.arrival.place.location);

                        map.addObjects([routeLine, startMarker, endMarker]);

                        map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
                    });
                }
            };
            const router = platform.getRoutingService(null, 8);
            this.map = router.calculateRoute(routingParameters, onResult,
                function(error) {
                    alert(error.message);
                });
            let ui = new H.ui.UI.createDefault(map, layer);
            ui.getControl("mapsettings").setVisibility(false)
            ui.getControl("scalebar").setAlignment('top-left')
            ui.getControl('zoom').setAlignment('top-left');

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
