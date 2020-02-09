import React, {Component} from "react";
import './ResolvedList.css';
import ResolvedBox from "./ResolvedBox";

class ResolvedIncidentsList extends Component {
    render() {
        return (
            <ul className="resolvedList">
                {
                    this.props.entries.map(item => <ResolvedBox key={item.id}
                                                                item={item}
                                                                showImage={this.props.showImage}
                                                                undo={this.props.undo}
                                                                showMarker={this.props.showMarker}/>)
                }
            </ul>
        );
    }


}

export default ResolvedIncidentsList;