import React, {Component} from "react";
import './OverlayIncident.css';

class OverlayIncident extends Component {
    render() {
        const image = this.props.image;
        return (
            <div className="imageOverlay"
                 onClick={() => this.props.onClose()}>
                <p className={'overlay-info'}>
                    Click outside of the image to close
                </p>
                <div className={'img-wrapper'}>
                    <img className={'overlay-image'}
                         src={image}
                         alt="video feed"
                         onClick={(e) => e.stopPropagation()} />
                </div>
            </div>
        )
    }
}

export default OverlayIncident;