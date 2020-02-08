import React, {Component} from "react";
import AlertNotificationList from "./components/AlertNotificationList"
import OverlayIncident from "./components/OverlayIncident"

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
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
                    items: prevState.items.concat(newItem)
                };
            });

            this._inputElement.value = "";
        }
        console.log(this.state.items);

        e.preventDefault();

    }

    showImage = (image) => {
        this.setState({
            showOverlay: true,
            overlayImage: image
        });
    };

    render() {
        return (
        <div className="todoListMain">
        <div className="header">

        <div style={{width: "600px", height: "300px"}}/>
        </div>
        <AlertNotificationList entries={this.state.items} showImage={this.showImage}/>
            {
                this.state.showOverlay ? <OverlayIncident image={this.state.overlayImage}/> : "No"
            }
        </div>
        );
    }
    }

    export default App;