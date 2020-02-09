import React, {Component} from "react";
import AlertNotificationList from "./components/AlertNotificationList"
import OverlayIncident from "./components/OverlayIncident"
import './App.css'
import ResolvedList from "./components/ResolvedList";
import ResolvedNoncrimeList from "./components/ResolvedNoncrimeList";

const axios = require('axios');

class App extends Component {
    constructor(props) {
        super(props);

        const unresolved = [
            {
                id: 1,
                image: 'https://avatars2.githubusercontent.com/u/199657?s=88&v=4',
                category: 0
            },
            {
                id: 2,
                image: "./logo512.png",
                category: 1
            },
            {
                id: 3,
                image: "./logo512.png",
                category: 0
            },
            {
                id: 4,
                image: "./logo512.png",
                category: 2
            }
        ];

        this.state = {
            unresolved: [],
            showOverlay: false
        };

        this.fetchAllAlerts();
    }

    fetchAllAlerts = () => {
        axios.get('/api/alerts').then(response => this.setState({
            unresolved: response.data.alerts
        })).catch((error) => console.log(error));
    };

    getAlerts = (category) => {
        let items = [];
        this.state.unresolved.forEach(function(item) {
            if (item.category === category) {
                items.push(item)
            }
        });
        return items;
    };

    showImage = (image) => {
        this.setState({
            showOverlay: true,
            overlayImage: image
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
            <div className="todoListMain">
                <div className="map">

                    <div style={{width: "600px", height: "300px"}}/>
                </div>
                <h3 className="whiteText">Unresolved</h3>
                <AlertNotificationList entries={this.getAlerts(0)} showImage={this.showImage}/>
                {
                    this.state.showOverlay ?
                        <OverlayIncident image={this.state.overlayImage} onClose={this.onClose}/> : null
                }

                <div className="resolved">
                    <h3 className="whiteText">Crime</h3>
                    <ResolvedList entries={this.getAlerts(1)} showImage={this.showImage}/>
                    {
                        this.state.showOverlay ?
                            <OverlayIncident image={this.state.overlayImage} onClose={this.onClose}/> : null
                    }
                </div>
                <div className="resolved">
                    <h3 className="whiteText">Non-crime</h3>
                    <ResolvedNoncrimeList entries={this.getAlerts(2)} showImage={this.showImage}/>
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