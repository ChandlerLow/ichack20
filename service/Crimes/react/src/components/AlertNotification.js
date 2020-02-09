import React, {Component} from "react";
import './AlertNotification.css';

class AlertNotification extends Component {

    render() {
        return (
            <div className={'alert-box'}>
                <div className={'alert-box-camera-id'}>
                    Alert: {this.props.item.id
                }</div>
                <button type="view"
                        className="btn btn-outline-primary"
                        onClick={() => this.props.showImage(this.props.item.image)}>
                    View
                </button>
                <button type="crime"
                        className="btn btn-outline-danger"
                        onClick={() => this.props.updateCategory(this.props.item.id, 1)}>
                    Crime
                </button>
                <button type="dismiss"
                        className="btn btn-outline-secondary"
                        onClick={() => this.props.updateCategory(this.props.item.id, 2)}>
                    Dismiss
                </button>
            </div>
        );
    }
}

export default AlertNotification;