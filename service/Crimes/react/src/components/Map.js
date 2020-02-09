import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.css';

const Marker = ({text}) => <div className={'marker'}> 📍 <b>Alert {text}</b></div>;

export default class Map extends Component {

    constructor(props) {
        super(props);


        this.state = {
            zoom: 12,
            showMarker: false,
            center: {
                lat: 51.5074,
                lng: 0.1278
            }

        };
    }

    displayMark() {
        return (
            <div className={'map-wrapper'}>
                <GoogleMapReact
                    center={{lat:this.props.showLat, lng:this.props.showLng}}
                    zoom={this.state.zoom}
                    onZoomChanged={this.props.showMark}
                >

                    <Marker lat={this.props.showLat}
                            lng={this.props.showLng}
                            text={this.props.markId}/>
                </GoogleMapReact>
            </div>
        )

    };

    originalMap() {
        return (
            <div className={'map-wrapper'}>
                <GoogleMapReact
                    center={this.state.center}
                    zoom={this.state.zoom}
                    onZoomChanged={this.props.showMark}
                >
                </GoogleMapReact>
            </div>
        )

    }


    render() {

        if (this.props.showMark) {
            return this.displayMark()
        } else {
            return this.originalMap()
        }

    }

}
