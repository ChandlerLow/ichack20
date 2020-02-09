import React, {Component} from "react";
import './AlertNotificationList.css';
import AlertNotification from "./AlertNotification";

class AlertNotificationList extends Component {

    render() {
        const items = this.props.entries;
        return (
            <ul className="theList">
                {
                    items.map(item => <AlertNotification key={item.id}
                                                         item={item}
                                                         showImage={this.props.showImage}
                                                         updateCategory={this.props.updateCategory}
                                                         showMarker={this.props.showMarker}
                    />)
                }
            </ul>
        );
    }


}

export default AlertNotificationList;