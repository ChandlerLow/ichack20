import React, {Component} from "react";
import AlertNotificationList from "./components/AlertNotificationList"
import OverlayIncident from "./components/OverlayIncident"
import './App.css'
import ResolvedBoxList from "./components/ResolvedBoxList";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            unresolved: [
                {
                    id: 1,
                    cameraId: 22,
                    image: 'https://avatars2.githubusercontent.com/u/199657?s=88&v=4'
                },
                {
                    id: 2,
                    cameraId: 32,
                    image: "./logo512.png"
                },
                {
                    id: 3,
                    cameraId: 42,
                    image: "./logo512.png"
                },
                {
                    id: 4,
                    cameraId: 42,
                    image: "./logo512.png"
                }
            ],
            showOverlay: false
        };

        this.addItem = this.addItem.bind(this);
    }

    addItem(e) {

        if (this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };

            this.setState((prevState) => {
                return {
                    unresolved: prevState.unresolved.concat(newItem)
                };
            });

            this._inputElement.value = "";
        }
        console.log(this.state.unresolved);

        e.preventDefault();

    }

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
                <AlertNotificationList entries={this.state.unresolved} showImage={this.showImage}/>
                {
                    this.state.showOverlay ?
                        <OverlayIncident image={this.state.overlayImage} onClose={this.onClose}/> : null
                }

                <div className="resolved">
                    <h3 className="whiteText">Crime</h3>
                    <ResolvedBoxList showImage={this.showImage}/>
                    {
                        this.state.showOverlay ?
                            <OverlayIncident image={this.state.overlayImage} onClose={this.onClose}/> : null
                    }
                </div>
                <div className="resolved">
                    <h3 className="whiteText">Non-crime</h3>
                    <ResolvedBoxList showImage={this.showImage}/>
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