import React, {Component} from "react";

class OverlayIncident extends Component {
    render() {
        const image = this.props.image
        return (
            <div className="imageOverlay">
                <img src={image} alt="video feed"/>
            </div>
        )
    }
}

export default OverlayIncident;