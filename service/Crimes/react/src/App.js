import React, {Component} from "react";
import AlertNotificationList from "./components/AlertNotificationList"
import OverlayIncident from "./components/OverlayIncident"
import './App.css'
import ResolvedList from "./components/ResolvedList";
import ResolvedNoncrimeList from "./components/ResolvedNoncrimeList";
import Map from "./components/Map";

const axios = require('axios');

class App extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     unresolved: [
        //         {
        //             id: 1,
        //             image: 'https://avatars2.githubusercontent.com/u/199657?s=88&v=4'
        //         },
        //         {
        //             id: 2,
        //             image: "./logo512.png"
        //         }
        //     ],
        //     crime: [
        //         {
        //             id: 3,
        //             image: "./logo512.png"
        //         }
        //
        //     ],
        //     nonCrime: [
        //         {
        //             id: 4,
        //             image: "./logo512.png"
        //         }
        //     ],
        //     showOverlay: false
        // };
        this.state = {
            alerts: [],
            unresolved: [],
            crime: [],
            nonCrime: [],
            showOverlay: false,
            showMarker: false,
        };

        this.fetchAllAlerts();
    }

    fetchAllAlerts = () => {
        axios.get('/api/alerts').then(response => {
            const alerts = response.data.alerts;
            const unresolved = alerts.filter(item => item.category === 0);
            const crime = alerts.filter(item => item.category === 1);
            const nonCrime = alerts.filter(item => item.category === 2);

            this.setState({
                alerts: alerts,
                unresolved: unresolved,
                crime: crime,
                nonCrime: nonCrime
            })
        }).catch((error) => console.log(error));
    };

    updateCategory = (id, category) => {
        axios.put('/api/alerts', {
            id: id,
            category: category
        }).then(this.fetchAllAlerts).catch(error => console.log(error));
    };

    showImage = (image) => {
        this.setState({
            showOverlay: true,
            overlayImage: image
        });
    };

    showMarker = (lat, long) => {
        this.setState({
            showMarker: true,
            showLong: long,
            showLat: lat
        });
    };

    onClose = () => {
        this.setState({
                showOverlay: false
            }
        );
    };

    render() {
        return (
            <div className="pageWrapper">
                <h1 className={'title'}>au.paire</h1>
                <Map alerts={this.state.alerts}/>
                <h3 className="whiteText">Unresolved</h3>
                <AlertNotificationList entries={this.state.unresolved}
                                       showImage={this.showImage}
                                       showMarker={this.showMarker}
                                       updateCategory={this.updateCategory}/>
                {
                    this.state.showOverlay ?
                        <OverlayIncident image={this.state.overlayImage}
                                         onClose={this.onClose}/> : null
                }

                <div className="resolved">
                    <h3 className="whiteText">Crime</h3>
                    <ResolvedList entries={this.state.crime}
                                  showImage={this.showImage}
                                  showMarker={this.showMarker}
                                  undo={(id) => this.updateCategory(id, 0)}/>
                    {
                        this.state.showOverlay ?
                            <OverlayIncident image={this.state.overlayImage}
                                             onClose={this.onClose}/> : null
                    }
                </div>
                <div className="resolved">
                    <h3 className="whiteText">Non-crime</h3>
                    <ResolvedNoncrimeList entries={this.state.nonCrime}
                                          showImage={this.showImage}
                                          showMarker={this.showMarker}
                                          undo={(id) => this.updateCategory(id, 0)}/>
                    {
                        this.state.showOverlay ?
                            <OverlayIncident image={this.state.overlayImage} onClose={this.onClose}/> : null
                    }

                </div>


            </div>

        );
    }
}

export default App;