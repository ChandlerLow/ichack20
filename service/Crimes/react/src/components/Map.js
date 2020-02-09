import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.css';

const Marker = ({ text }) => <div><b>+</b>{text}</div>;

export default class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            zoom: 15,
            center: {
                lat: 51.497799,
                lng: -0.179220
            }
        };
    }


    render() {
        return (
            <div className={'map-wrapper'}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyD9PyZsLKm2Na9WmDEG8saDZ3edx3bjY7E'}}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                >
                    {
                        this.props.alerts.map(item => <Marker key={item.id}
                                                              lat={item.lat}
                                                              lng={item.lng}
                                                              text={'Alert ' + item.id}/>)
                    }
                </GoogleMapReact>
            </div>
    );
    }

    }