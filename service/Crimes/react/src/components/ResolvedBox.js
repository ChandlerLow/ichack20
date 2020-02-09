import React, {Component} from "react";
import './AlertNotification.css';

class ResolvedBox extends Component {

    render() {
        return (
            <div className={'alert-box'}>
                <div className={'alert-box-camera-id'}>
                    Alert: {this.props.item.id}
                </div>
                <button type="view"
                        className="btn btn-outline-primary"
                        onClick={() => this.props.showImage(this.props.item.image_path)}>
                    View
                </button>
                <button type="undo"
                        className="btn btn-outline-secondary"
                        onClick={() => this.props.undo(this.props.item.id)}>
                    Undo
                </button>
            </div>
        );
    }
}

export default ResolvedBox;