import React, {Component} from "react";
import './AlertNotification.css';

class ResolvedBox extends Component {

    render() {
        console.log(this.props.item)
        return(
            <div className={'alert-box'}>
                <div className={'alert-box-camera-id'}>Alert: {this.props.item.id}</div>
                <button type="view" className="btn btn-outline-primary" onClick={() => this.props.showImage(this.props.item.image)}>
                    View
                </button>
                <button type="uno" className="btn btn-outline-secondary" >Undo</button>
            </div>
        );
    }
}

export default ResolvedBox;