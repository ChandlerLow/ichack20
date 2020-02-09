import React, {Component} from "react";
import './AlertNotification.css';

class AlertNotification extends Component {

    render() {
        console.log(this.props.item)
        return(
            <div className={'alert-box'}>
                <div className={'alert-box-camera-id'}>Alert: {this.props.item.id}</div>
                <button type="view" className="btn btn-outline-primary" onClick={() => this.props.showImage(this.props.item.image)}>
                    View
                </button>
                <button type="crime" className="btn btn-outline-danger" >Crime</button>
                <button type="dismiss" className="btn btn-outline-secondary" >Dismiss</button>
            </div>
        );
    }
}

export default AlertNotification;