import React, {Component} from "react";
import './AlertNotificationList.css';
import AlertNotification from "./AlertNotification";

class AlertNotificationList extends Component {

    render() {
        const items = this.props.entries;
        return (
            <ul className="theList">
                {
                    items.map(item => <AlertNotification item={item}
                                                               showImage={this.props.showImage}
                                                               updateCategory={this.props.updateCategory} />)
                }
            </ul>
        );
    }


}

export default AlertNotificationList;