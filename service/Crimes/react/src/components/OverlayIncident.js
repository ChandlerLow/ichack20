import React, {Component} from "react";
import './OverlayIncident.css';

class OverlayIncident extends Component {
    render() {
        const image = this.props.image
        return (
            <div className="imageOverlay">
                <img src={image} alt="video feed"/>
                <div className={'overlay-close'} onClick={() => this.props.onClose()}/> {
                this.props.children
            }
            </div>
        )
    }
}

export default OverlayIncident;