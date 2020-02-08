import React, {Component} from "react";
import './AlertNotificationList.css';
import AlertNotification from "./AlertNotification";

class AlertNotificationList extends Component {

    render() {
        var todoEntries = this.props.entries;

        return (
            <ul className="theList">
                {
                    todoEntries.map(item => <AlertNotification item={item}
                    showImage={this.props.showImage}/>)
                }
            </ul>
        );
    }
}

export default AlertNotificationList;